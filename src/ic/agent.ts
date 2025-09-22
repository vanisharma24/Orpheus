import { HttpAgent, Actor, type ActorSubclass } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import type { IDL } from '@dfinity/candid';
import { idlFactory } from './idl';
import { IC_HOST, II_URL, ORPHEUS_BACKEND_CANISTER_ID } from './config';

// Type definitions for OrpheusBackend with $MUSE Token System
export type OrpheusBackend = {
  // Existing project methods
  whoami: () => Promise<string>;
  create_project: (req: { name: string }) => Promise<{ success: boolean; project_id: [] | [string]; error: [] | [string]; }>;
  list_projects: () => Promise<{ success: boolean; projects: Array<{ id: string; name: string; owner_principal: string }>; error: [] | [string]; }>;

  // $MUSE Token System methods
  get_token_info: () => Promise<{ total_supply: bigint; symbol: string; name: string; decimals: number; }>;
  get_balance: (principal: string) => Promise<{ balance: bigint; }>;
  transfer_tokens: (req: { to: string; amount: number }) => Promise<{ success: boolean; error: [] | [string]; }>;
  mint_tokens: (req: { to: string; amount: number; reason: string }) => Promise<{ success: boolean; error: [] | [string]; }>;
  reward_collaboration: (projectId: string, collaborators: Array<[string, number]>, reason: string) => Promise<{ success: boolean; error: [] | [string]; }>;
};

let authClient: AuthClient | null = null;
let actor: ActorSubclass | null = null;

const createAgent = async () => {
  const client = authClient ?? (await AuthClient.create());
  authClient = client;
  const identity = (await client.isAuthenticated()) ? client.getIdentity() : undefined;

  const agent = new HttpAgent({ host: IC_HOST, identity });
  if (process.env.NODE_ENV === 'development' && IC_HOST.includes('127.0.0.1')) {
    try {
      await agent.fetchRootKey();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn('Unable to fetch root key. Is the local replica running?');
    }
  }
  return agent;
};

export const login = async () => {
  const client = authClient ?? (await AuthClient.create());
  authClient = client;
  return client.login({
    identityProvider: II_URL,
    onSuccess: async () => {
      actor = null; // force re-create with authenticated identity
    },
  });
};

export const logout = async () => {
  if (!authClient) return;
  await authClient.logout();
  actor = null;
};

export const getActor = async (): Promise<OrpheusBackend> => {
  if (!ORPHEUS_BACKEND_CANISTER_ID) {
    throw new Error('Missing canister id: set VITE_ORPHEUS_BACKEND_CANISTER_ID');
  }
  if (actor) return actor as unknown as OrpheusBackend;

  const agent = await createAgent();
  const a = Actor.createActor(idlFactory as unknown as IDL.InterfaceFactory, {
    agent,
    canisterId: ORPHEUS_BACKEND_CANISTER_ID,
  });
  actor = a;
  return a as unknown as OrpheusBackend;
};
