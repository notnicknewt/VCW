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
      <div className="progress-container">
        <div 
          className="progress-bar-fill"
          style={{ width: `${(currentIndex / (STEPS.length - 1)) * 100}%` }}
        ></div>
        
        {STEPS.map((step, index) => (
          <div 
            key={step.id}
            className={`progress-step ${currentIndex >= index ? "completed" : ""} ${currentIndex === index ? "active" : ""}`}
          >
            <div className="step-indicator">{index + 1}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
