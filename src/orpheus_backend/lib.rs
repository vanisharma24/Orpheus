use candid::{CandidType, Deserialize, Principal};
use ic_cdk::api::caller;
use std::collections::HashMap;
use std::sync::Mutex;
use std::sync::atomic::{AtomicU64, Ordering};

// Data model
#[derive(CandidType, Deserialize, Clone)]
pub struct Project {
    pub id: String,
    pub name: String,
    pub owner_principal: Principal,
}

// $MUSE Token System
#[derive(CandidType, Deserialize, Clone)]
pub struct TokenInfo {
    pub total_supply: u64,
    pub symbol: String,
    pub name: String,
    pub decimals: u8,
}

#[derive(CandidType, Deserialize, Clone)]
pub struct UserBalance {
    pub balance: u64,
    pub last_updated: u64,
}

// Request/Response types
#[derive(CandidType, Deserialize)]
pub struct CreateProjectRequest {
    pub name: String,
}

#[derive(CandidType, Deserialize)]
pub struct CreateProjectResponse {
    pub success: bool,
    pub project_id: Option<String>,
    pub error: Option<String>,
}

#[derive(CandidType, Deserialize)]
pub struct ListProjectsResponse {
    pub success: bool,
    pub projects: Vec<Project>,
    pub error: Option<String>,
}

// Token-related request/response types
#[derive(CandidType, Deserialize)]
pub struct TransferRequest {
    pub to: Principal,
    pub amount: u64,
}

#[derive(CandidType, Deserialize)]
pub struct TransferResponse {
    pub success: bool,
    pub error: Option<String>,
}

#[derive(CandidType, Deserialize)]
pub struct MintRequest {
    pub to: Principal,
    pub amount: u64,
    pub reason: String,
}

#[derive(CandidType, Deserialize)]
pub struct MintResponse {
    pub success: bool,
    pub error: Option<String>,
}

#[derive(CandidType, Deserialize)]
pub struct BalanceResponse {
    pub balance: u64,
}

// In-memory storage with proper initialization
lazy_static::lazy_static! {
    static ref PROJECTS: Mutex<HashMap<String, Project>> = Mutex::new(HashMap::new());
    static ref NEXT_ID: AtomicU64 = AtomicU64::new(1);
    static ref USER_BALANCES: Mutex<HashMap<Principal, UserBalance>> = Mutex::new(HashMap::new());
    static ref TOKEN_INFO: Mutex<TokenInfo> = Mutex::new(TokenInfo {
        total_supply: 0,
        symbol: "MUSE".to_string(),
        name: "Muse Token".to_string(),
        decimals: 8,
    });
}

// Canister methods
#[ic_cdk::query]
pub fn whoami() -> Principal {
    caller()
}

#[ic_cdk::update]
pub fn create_project(request: CreateProjectRequest) -> CreateProjectResponse {
    let caller = caller();
    
    let project_id = format!("project_{}", NEXT_ID.fetch_add(1, Ordering::SeqCst));
    
    let project = Project {
        id: project_id.clone(),
        name: request.name,
        owner_principal: caller,
    };
    
    if let Ok(mut projects) = PROJECTS.lock() {
        projects.insert(project_id.clone(), project);
        
        CreateProjectResponse {
            success: true,
            project_id: Some(project_id),
            error: None,
        }
    } else {
        CreateProjectResponse {
            success: false,
            project_id: None,
            error: Some("Failed to acquire lock".to_string()),
        }
    }
}

// $MUSE Token System Methods

#[ic_cdk::update]
pub fn mint_tokens(request: MintRequest) -> MintResponse {
    let caller = caller();

    // Only allow minting from the canister itself (for rewards) or specific admin functions
    // For now, allowing minting for collaboration rewards
    if let Ok(mut balances) = USER_BALANCES.lock() {
        let current_balance = balances.get(&request.to).map(|b| b.balance).unwrap_or(0);
        let new_balance = current_balance + request.amount;

        balances.insert(request.to, UserBalance {
            balance: new_balance,
            last_updated: ic_cdk::api::time(),
        });

        // Update total supply
        if let Ok(mut token_info) = TOKEN_INFO.lock() {
            token_info.total_supply += request.amount;
        }

        MintResponse {
            success: true,
            error: None,
        }
    } else {
        MintResponse {
            success: false,
            error: Some("Failed to acquire lock".to_string()),
        }
    }
}

#[ic_cdk::update]
pub fn transfer_tokens(request: TransferRequest) -> TransferResponse {
    let caller = caller();

    if request.amount == 0 {
        return TransferResponse {
            success: false,
            error: Some("Amount must be greater than 0".to_string()),
        };
    }

    if let Ok(mut balances) = USER_BALANCES.lock() {
        let caller_balance = balances.get(&caller).map(|b| b.balance).unwrap_or(0);

        if caller_balance < request.amount {
            return TransferResponse {
                success: false,
                error: Some("Insufficient balance".to_string()),
            };
        }

        // Deduct from sender
        balances.insert(caller, UserBalance {
            balance: caller_balance - request.amount,
            last_updated: ic_cdk::api::time(),
        });

        // Add to recipient
        let recipient_balance = balances.get(&request.to).map(|b| b.balance).unwrap_or(0);
        balances.insert(request.to, UserBalance {
            balance: recipient_balance + request.amount,
            last_updated: ic_cdk::api::time(),
        });

        TransferResponse {
            success: true,
            error: None,
        }
    } else {
        TransferResponse {
            success: false,
            error: Some("Failed to acquire lock".to_string()),
        }
    }
}

#[ic_cdk::query]
pub fn get_balance(principal: Principal) -> BalanceResponse {
    if let Ok(balances) = USER_BALANCES.lock() {
        let balance = balances.get(&principal).map(|b| b.balance).unwrap_or(0);
        BalanceResponse { balance }
    } else {
        BalanceResponse { balance: 0 }
    }
}

#[ic_cdk::query]
pub fn get_token_info() -> TokenInfo {
    if let Ok(token_info) = TOKEN_INFO.lock() {
        token_info.clone()
    } else {
        TokenInfo {
            total_supply: 0,
            symbol: "MUSE".to_string(),
            name: "Muse Token".to_string(),
            decimals: 8,
        }
    }
}

#[ic_cdk::update]
pub fn reward_collaboration(project_id: String, collaborators: Vec<(Principal, u64)>, reason: String) -> TransferResponse {
    let caller = caller();

    // Verify caller owns the project
    if let Ok(projects) = PROJECTS.lock() {
        if let Some(project) = projects.get(&project_id) {
            if project.owner_principal != caller {
                return TransferResponse {
                    success: false,
                    error: Some("Only project owner can distribute rewards".to_string()),
                };
            }
        } else {
            return TransferResponse {
                success: false,
                error: Some("Project not found".to_string()),
            };
        }
    }

    // Distribute rewards to collaborators
    let mut total_rewarded = 0u64;
    let mut success = true;
    let mut error_msg = None;

    if let Ok(mut balances) = USER_BALANCES.lock() {
        for (collaborator, amount) in collaborators {
            if amount > 0 {
                let current_balance = balances.get(&collaborator).map(|b| b.balance).unwrap_or(0);
                balances.insert(collaborator, UserBalance {
                    balance: current_balance + amount,
                    last_updated: ic_cdk::api::time(),
                });
                total_rewarded += amount;
            }
        }

        // Update total supply
        if let Ok(mut token_info) = TOKEN_INFO.lock() {
            token_info.total_supply += total_rewarded;
        }
    } else {
        success = false;
        error_msg = Some("Failed to acquire lock".to_string());
    }

    TransferResponse {
        success,
        error: error_msg,
    }

}



