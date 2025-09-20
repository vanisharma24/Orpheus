import React, { useState } from 'react';
import { X, Upload, Users, Music, MessageCircle, CheckCircle } from 'lucide-react';

interface ProjectOnboardingProps {
  projectTitle: string;
  onClose: () => void;
  onComplete: (step: string) => void;
}

const ProjectOnboarding: React.FC<ProjectOnboardingProps> = ({ projectTitle, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    {
      id: 'upload',
      title: 'Upload Your First Track',
      description: 'Start by uploading an audio file, demo, or sketch to get the collaboration going.',
      icon: Upload,
      action: 'Upload Audio',
      color: 'bg-blue-600'
    },
    {
      id: 'invite',
      title: 'Invite Collaborators',
      description: 'Add musicians, producers, or vocalists to work on this project with you.',
      icon: Users,
      action: 'Invite People',
      color: 'bg-green-600'
    },
    {
      id: 'setup',
      title: 'Set Up Project Details',
      description: 'Define roles, ownership splits, and project goals to keep everyone aligned.',
      icon: Music,
      action: 'Configure Project',
      color: 'bg-purple-600'
    },
    {
      id: 'communicate',
      title: 'Start Collaborating',
      description: 'Use the built-in chat to discuss ideas, share feedback, and coordinate sessions.',
      icon: MessageCircle,
      action: 'Open Chat',
      color: 'bg-orange-600'
    }
  ];

  const handleStepAction = (stepId: string): void => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    
    // Handle specific actions
    switch (stepId) {
      case 'upload':
        onComplete('upload');
        break;
      case 'invite':
        onComplete('invite');
        break;
      case 'setup':
        onComplete('setup');
        break;
      case 'communicate':
        onComplete('chat');
        break;
    }
  };

  const handleSkip = (): void => {
    onClose();
  };

  return (
  <div className="bg-[#000] w-full h-full min-h-screen p-12 overflow-auto">
        {/* Header */}
        <div className="p-8 border-b border-[#730202]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-forum text-[#f5f5f5] mb-2">Welcome to {projectTitle}!</h2>
              <p className="text-[#f5f5f5] opacity-80 font-poppins">Let's get your project set up for success</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#f5f5f5] opacity-60 hover:opacity-100 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="p-6 border-b border-[#730202]">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  completedSteps.includes(step.id) 
                    ? 'bg-green-600 text-white' 
                    : currentStep === index 
                      ? 'bg-[#730202] text-white' 
                      : 'bg-gray-600 text-gray-400'
                }`}>
                  {completedSteps.includes(step.id) ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 transition-all ${
                    completedSteps.includes(step.id) ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <p className="text-[#f5f5f5] opacity-70 text-center font-poppins">
            {completedSteps.length} of {steps.length} steps completed
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              
              return (
                <div
                  key={step.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-300 ${
                    isCompleted 
                      ? 'border-green-600 bg-green-600 bg-opacity-10'
                      : 'border-[#730202] hover:border-[#f5f5f5] hover:bg-[#730202] hover:bg-opacity-10'
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      isCompleted ? 'bg-green-600' : step.color
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-poppins font-semibold text-[#f5f5f5]">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-[#f5f5f5] opacity-80 mb-6 font-poppins">
                    {step.description}
                  </p>
                  
                  <button
                    onClick={() => handleStepAction(step.id)}
                    disabled={isCompleted}
                    className={`w-full py-3 rounded-lg font-poppins transition-all ${
                      isCompleted
                        ? 'bg-green-600 text-white cursor-default'
                        : 'bg-[#730202] hover:bg-[#8B0000] text-[#f5f5f5]'
                    }`}
                  >
                    {isCompleted ? '✓ Completed' : step.action}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#730202]">
            <button
              onClick={handleSkip}
              className="px-6 py-3 text-[#f5f5f5] opacity-70 hover:opacity-100 transition font-poppins"
            >
              Skip for now
            </button>
            
            {completedSteps.length === steps.length && (
              <button
                onClick={onClose}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-poppins transition"
              >
                Get Started! 🎵
              </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default ProjectOnboarding;