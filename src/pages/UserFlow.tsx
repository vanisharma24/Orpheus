// src/components/UserFlow.tsx
import React from "react";
import UserFlowSection, { UserStep } from "./UserFlowSection";

const steps: UserStep[] = [
  { number: 1, title: "Sign Up", description: "Create your account to get started." },
  { number: 2, title: "Create Profile", description: "Set up your musician profile." },
  { number: 3, title: "Join Projects", description: "Collaborate with other artists." },
  { number: 4, title: "Share Music", description: "Publish and share your tracks." },
];

const UserFlow: React.FC = () => (
  <UserFlowSection steps={steps} />
);

export default UserFlow;
