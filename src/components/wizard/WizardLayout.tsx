import { useState } from 'react';
import WizardProgressBar from './WizardProgressBar';
import WizardNavigation from './WizardNavigation';
import ContentIdeaStep from './steps/ContentIdeaStep';
import HookGeneratorStep from './steps/HookGeneratorStep';
import ContentStructureStep from './steps/ContentStructureStep'; 
import CaptionsStep from './steps/CaptionsStep';
import PerformanceStep from './steps/PerformanceStep';
import WizardTooltip from './WizardTooltip';

type WizardStep = 'idea' | 'hook' | 'structure' | 'captions' | 'performance';

export default function WizardLayout() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('idea');
  
  const renderStep = () => {
    switch(currentStep) {
      case 'idea':
        return <ContentIdeaStep onNext={() => setCurrentStep('hook')} />;
      case 'hook':
        return <HookGeneratorStep 
          onNext={() => setCurrentStep('structure')} 
          onBack={() => setCurrentStep('idea')} 
        />;
      case 'structure':
        return <ContentStructureStep 
          onNext={() => setCurrentStep('captions')} 
          onBack={() => setCurrentStep('hook')} 
        />;
      case 'captions':
        return <CaptionsStep 
          onNext={() => setCurrentStep('performance')} 
          onBack={() => setCurrentStep('structure')} 
        />;
      case 'performance':
        return <PerformanceStep 
          onBack={() => setCurrentStep('captions')} 
        />;
    }
  };

  return (
    <div className="wizard-container">
      <WizardProgressBar currentStep={currentStep} />
      
      <div className="wizard-content">
        {renderStep()}
      </div>
      
      <WizardNavigation 
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
    </div>
  );
}
