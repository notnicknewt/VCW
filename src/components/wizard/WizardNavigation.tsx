type WizardStep = "idea" | "hook" | "structure" | "captions" | "performance";

interface WizardNavigationProps {
  currentStep: WizardStep;
  onStepChange: (step: WizardStep) => void;
}

const STEPS: WizardStep[] = ["idea", "hook", "structure", "captions", "performance"];

export default function WizardNavigation({ currentStep, onStepChange }: WizardNavigationProps) {
  const currentIndex = STEPS.indexOf(currentStep);
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      onStepChange(STEPS[currentIndex - 1]);
    }
  };
  
  const handleNext = () => {
    if (currentIndex < STEPS.length - 1) {
      onStepChange(STEPS[currentIndex + 1]);
    }
  };
  
  return (
    <div className="wizard-navigation-buttons">
      <button
        className="previous-button"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      
      <button
        className="next-button"
        onClick={handleNext}
        disabled={currentIndex === STEPS.length - 1}
      >
        Next
      </button>
    </div>
  );
}
