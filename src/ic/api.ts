import { getActor } from './agent';

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
