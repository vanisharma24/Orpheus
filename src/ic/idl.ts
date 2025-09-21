// Minimal IDL factory for orpheus_backend
// Matches src/orpheus_backend/orpheus_backend.did
import { IDL } from '@dfinity/candid';

export const idlFactory: IDL.InterfaceFactory = ({ IDL }) => {
  const Project = IDL.Record({
    id: IDL.Text,
    name: IDL.Text,
    owner_principal: IDL.Principal,
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

  return IDL.Service({
    whoami: IDL.Func([], [IDL.Principal], ['query']),
    create_project: IDL.Func([CreateProjectRequest], [CreateProjectResponse], []),
    list_projects: IDL.Func([], [ListProjectsResponse], ['query']),
  });
};

export default idlFactory;
