import React from "react";

export type UserStep = {
  number: number;
  title: string;
  description: string;
};

const UserFlowSection: React.FC<{ steps: UserStep[] }> = ({ steps }) => (
  <div className="bg-black min-h-screen px-8 py-16 flex items-center justify-center">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
      {steps.map((step) => (
        <div key={step.number} className="flex items-start space-x-5">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#730202] flex items-center justify-center text-2xl text-[#f5f5f5] font-bold font-poppins">
            {step.number}
          </div>
          <div>
            <h2 className="font-poppins text-2xl md:text-2xl font-bold text-[#f5f5f5] mb-2">{step.title}</h2>
            <p className="font-poppins text-base text-[#f5f5f5] opacity-80">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UserFlowSection;
