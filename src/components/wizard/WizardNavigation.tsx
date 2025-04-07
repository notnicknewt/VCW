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
    <div className="wizard-navigation-buttons mt-8 flex justify-between">
      <button
        className="previous-button px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <button
        className="next-button px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={currentIndex === STEPS.length - 1}
      >
        Next
      </button>
    </div>
  );
}
