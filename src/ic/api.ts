import { getActor } from './agent';
import { Principal } from '@dfinity/principal';

// Existing project methods
export const whoami = async () => {
  const actor = await getActor();
  return actor.whoami();
};

export const createProject = async (name: string) => {
  const actor = await getActor();
  return actor.create_project({ name });
};

export const listProjects = async () => {
  const actor = await getActor();
  return actor.list_projects();
};

// $MUSE Token System methods
export const getTokenInfo = async () => {
  const actor = await getActor();
  return actor.get_token_info();
};

export const getBalance = async (principal: string) => {
  const actor = await getActor();
  const principalObj = Principal.fromText(principal);
  return actor.get_balance(principalObj);
};

export const transferTokens = async (to: string, amount: number) => {
  const actor = await getActor();
  const toPrincipal = Principal.fromText(to);
  return actor.transfer_tokens({ to: toPrincipal, amount: BigInt(amount) });
};

export const mintTokens = async (to: string, amount: number, reason: string) => {
  const actor = await getActor();
  const toPrincipal = Principal.fromText(to);
  return actor.mint_tokens({ to: toPrincipal, amount: BigInt(amount), reason });
};

export const rewardCollaboration = async (
  projectId: string,
  collaborators: Array<[string, number]>,
  reason: string
) => {
  const actor = await getActor();
  const collaboratorsFormatted: [Principal, bigint][] = collaborators.map(([principalStr, amount]) => [
    Principal.fromText(principalStr),
    BigInt(amount),
  ]);
  return actor.reward_collaboration(projectId, collaboratorsFormatted, reason);
};
