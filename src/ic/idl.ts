// IDL factory for orpheus_backend with $MUSE Token System
// Matches src/orpheus_backend/orpheus_backend.did
import { IDL } from '@dfinity/candid';

export const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  const Project = IDL.Record({
    id: IDL.Text,
    name: IDL.Text,
    owner_principal: IDL.Principal,
  });

  const TokenInfo = IDL.Record({
    total_supply: IDL.Nat64,
    symbol: IDL.Text,
    name: IDL.Text,
    decimals: IDL.Nat8,
  });

  const CreateProjectRequest = IDL.Record({ name: IDL.Text });
  const CreateProjectResponse = IDL.Record({
    success: IDL.Bool,
    project_id: IDL.Opt(IDL.Text),
    error: IDL.Opt(IDL.Text),
  });
  const ListProjectsResponse = IDL.Record({
    success: IDL.Bool,
    projects: IDL.Vec(Project),
    error: IDL.Opt(IDL.Text),
  });

  // Token-related types
  const TransferRequest = IDL.Record({
    to: IDL.Principal,
    amount: IDL.Nat64,
  });
  const TransferResponse = IDL.Record({
    success: IDL.Bool,
    error: IDL.Opt(IDL.Text),
  });
  const MintRequest = IDL.Record({
    to: IDL.Principal,
    amount: IDL.Nat64,
    reason: IDL.Text,
  });
  const MintResponse = IDL.Record({
    success: IDL.Bool,
    error: IDL.Opt(IDL.Text),
  });
  const BalanceResponse = IDL.Record({
    balance: IDL.Nat64,
  });

  return IDL.Service({
    // Existing project methods
    whoami: IDL.Func([], [IDL.Principal], ['query']),
    create_project: IDL.Func([CreateProjectRequest], [CreateProjectResponse], []),
    list_projects: IDL.Func([], [ListProjectsResponse], ['query']),

    // $MUSE Token System methods
    mint_tokens: IDL.Func([MintRequest], [MintResponse], []),
    transfer_tokens: IDL.Func([TransferRequest], [TransferResponse], []),
    get_balance: IDL.Func([IDL.Principal], [BalanceResponse], ['query']),
    get_token_info: IDL.Func([], [TokenInfo], ['query']),
    reward_collaboration: IDL.Func([IDL.Text, IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)), IDL.Text], [TransferResponse], []),
  });
};

export default idlFactory;
