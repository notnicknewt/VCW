type WizardStep = "idea" | "hook" | "structure" | "captions" | "performance";

interface WizardProgressBarProps {
  currentStep: WizardStep;
}

const STEPS = [
  { id: "idea", label: "Content Idea" },
  { id: "hook", label: "Hook Generator" },
  { id: "structure", label: "Content Structure" },
  { id: "captions", label: "Captions & Hashtags" },
  { id: "performance", label: "Performance Analysis" },
];

export default function WizardProgressBar({ currentStep }: WizardProgressBarProps) {
  const currentIndex = STEPS.findIndex(step => step.id === currentStep);

  return (
    <div className="wizard-progress">
      <div className="progress-container relative flex justify-between items-center">
        <div className="progress-bar-bg absolute h-1 w-full bg-gray-200"></div>
        <div 
          className="progress-bar-fill absolute h-1 bg-purple-600 transition-all duration-300" 
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        ></div>

        {STEPS.map((step, index) => (
          <div 
            key={step.id} 
            className={`progress-step relative flex flex-col items-center z-10 ${
              currentIndex >= index ? "completed" : ""
            } ${currentIndex === index ? "active" : ""}`}
          >
            <div className={`step-indicator flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              currentIndex >= index ? "border-purple-600 bg-purple-600 text-white" : "border-gray-300 bg-white text-gray-500"
            }`}>
              {index + 1}
            </div>
            <div className={`step-label mt-2 text-xs font-medium ${
              currentIndex >= index ? "text-purple-600" : "text-gray-500"
            }`}>
              {step.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
