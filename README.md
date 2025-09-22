# 🎵 Orpheus - Collaborative Music Creation Platform

**Create. Collaborate. Own Your Music.**

Orpheus is a decentralized music collaboration platform built on the Internet Computer (IC) that connects musicians, producers, and creators worldwide. Our platform offers intuitive tools for real-time jamming, recording, and editing, enabling seamless teamwork on every track.

## ✨ Features

### 🎼 Core Features
- **Real-time Collaboration**: Jam with musicians and producers in sync with ultra-low latency
- **Multi-Track Editor**: Record, organize, and layer complex productions together
- **Global Community**: Connect with a diverse network of global creators
- **Secure Cloud Storage**: Your sessions, stems, and projects are always safe and backed up
- **Built-in Chat and Messaging**: Collaborate and share feedback in real time
- **Token Rewards System**: Earn $MUSE tokens for collaboration and contributions

### 💰 $MUSE Token System
- **Native Token**: $MUSE tokens for rewarding collaboration
- **Transfer System**: Send tokens to other users
- **Minting**: Project owners can reward collaborators
- **Balance Tracking**: Real-time token balance display

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Internet Computer Agent** for blockchain integration

### Backend
- **Rust** canister on Internet Computer
- **Candid** interface definition language
- **DFX** for local development and deployment

### Development Tools
- **ESLint** for code linting
- **PostCSS** for CSS processing
- **Docker** for containerized deployment

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Rust** (for backend development)
- **DFX** (Internet Computer SDK)
- **Git**

### For Windows Users
If you're on Windows and encounter build issues with Rust:
1. Install **Visual Studio Build Tools** from https://visualstudio.microsoft.com/downloads/
2. Select "C++ build tools" workload during installation
3. Restart your terminal after installation

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd orpheus
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Set Up Internet Computer Environment
```bash
# Install DFX if you haven't already
npm install -g dfx

# Start local Internet Computer replica
dfx start --clean

# Deploy canisters in a new terminal
dfx deploy
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗 Development Setup

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Backend Development
```bash
# Check Rust code
cargo check

# Build Rust canister
cargo build

# Run tests
cargo test
```

### Internet Computer Development
```bash
# Start local replica
dfx start

# Create new canisters
dfx canister create orpheus_backend
dfx canister create orpheus_frontend

# Build canisters
dfx build

# Deploy canisters
dfx deploy

# View canister status
dfx canister status orpheus_backend
```

## 🌐 Deployment

### Local Development Deployment
1. Start the local IC replica:
   ```bash
   dfx start --clean
   ```

2. Deploy canisters:
   ```bash
   dfx deploy
   ```

3. Access your dApp at the generated canister URL

### Production Deployment
1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Deploy to Internet Computer**:
   ```bash
   dfx deploy --network ic
   ```

3. **Get your canister URL**:
   ```bash
   dfx canister --network ic id orpheus_frontend
   ```

## 👥 User Flow

### For New Users
1. **Landing Page**: Visit the homepage to learn about Orpheus
2. **Connect Wallet**: Connect your Internet Computer wallet
3. **Create Profile**: Set up your musician profile
4. **Explore**: Browse existing projects or create your own

### For Project Creation
1. **Create Project**: Start a new music collaboration project
2. **Set Parameters**: Define project goals, genres, and requirements
3. **Invite Collaborators**: Share project link with other musicians
4. **Collaborate**: Work together in real-time or asynchronously

### For Collaboration
1. **Join Project**: Accept invitation or join public projects
2. **Contribute**: Add tracks, suggest edits, provide feedback
3. **Earn Rewards**: Receive $MUSE tokens for valuable contributions
4. **Finalize**: Complete the project and share with the community

## 📚 API Documentation

### Backend Canister Methods

#### Project Management
- `create_project(name: String)` → `CreateProjectResponse`
- `list_projects()` → `ListProjectsResponse`
- `get_project(id: String)` → `Project`

#### Token System
- `mint_tokens(to: Principal, amount: u64, reason: String)` → `MintResponse`
- `transfer_tokens(to: Principal, amount: u64)` → `TransferResponse`
- `get_balance(principal: Principal)` → `BalanceResponse`
- `get_token_info()` → `TokenInfo`

#### Utility Methods
- `whoami()` → `Principal` - Get current user principal
- `reward_collaboration(project_id: String, collaborators: Vec<(Principal, u64)>, reason: String)` → `TransferResponse`

### Frontend API Integration

The frontend communicates with the Internet Computer backend through:
- **Agent Configuration**: `src/ic/agent.ts`
- **API Functions**: `src/ic/api.ts`
- **Type Definitions**: `src/ic/idl.ts`

## 📁 Project Structure

```
orpheus/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── TokenBalance.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ...
│   ├── pages/              # Main application pages
│   │   ├── dashboardmain.tsx
│   │   ├── ConnectWallet.tsx
│   │   ├── Community.tsx
│   │   └── ...
│   ├── ic/                 # Internet Computer integration
│   │   ├── agent.ts        # IC agent configuration
│   │   ├── api.ts          # API function calls
│   │   └── idl.ts          # Type definitions
│   ├── orpheus_backend/    # Rust canister code
│   │   └── lib.rs
│   └── ...
├── public/                 # Static assets
├── dist/                   # Build output
└── dfx.json               # IC canister configuration
```

## 🎯 Key Components

### Core Pages
- **Dashboard** (`/dashboardmain`): Main project management interface
- **Community** (`/community`): Browse and join projects
- **Workspace** (`/workspace`): Music creation and editing
- **Profile** (`/userprofile`): User settings and token balance
- **Project Creation** (`/create`): Start new collaborations

### Token Integration
- **TokenBalance**: Display current $MUSE balance
- **TokenTransfer**: Send tokens to other users
- **CollaborationRewards**: Automatic reward distribution

## 🧪 Testing

### Frontend Testing
```bash
# Run development server
npm run dev

# Test key user flows:
# 1. Connect wallet
# 2. Create new project
# 3. Join community project
# 4. Check token balance
# 5. Transfer tokens
```

### Backend Testing
```bash
# Test canister methods
dfx canister call orpheus_backend create_project '("Test Project")'
dfx canister call orpheus_backend get_balance '(principal "your-principal-id")'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: orpheus.collab@gmail.com
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-repo/discussions)

## 🙏 Acknowledgments

- Internet Computer team for the amazing blockchain platform
- DFINITY for the development tools and SDK
- Open source community for the incredible tools and libraries

---

**Made with ❤️ for musicians, by musicians**

*Empowering global music collaboration through decentralized technology*
