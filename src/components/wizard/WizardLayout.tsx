"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContentIdeaStep from "./steps/ContentIdeaStep";

export type WizardStep = "idea" | "hook" | "structure" | "captions" | "performance";

export default function WizardLayout() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<WizardStep>("idea");
  
  const handleBack = () => {
    router.push("/dashboard");
  };
  
  const renderStep = () => {
    switch(currentStep) {
      case "idea":
        return <ContentIdeaStep onNext={() => setCurrentStep("hook")} />;
      case "hook":
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Hook Generator</h2>
            <p className="text-gray-600 mb-6">
              This step will help you create powerful hooks for your content.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <p className="text-yellow-700">
                The Hook Generator is coming soon! This feature will let you select hook types and generate 
                attention-grabbing hooks for your videos.
              </p>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep("idea")} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep("structure")} 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Continue
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Coming Soon</h2>
            <p className="text-gray-600">
              This part of the wizard is still under development. Check back soon!
            </p>
            <button 
              onClick={() => setCurrentStep("idea")} 
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Back to Content Idea
            </button>
          </div>
        );
    }
  };

  return (
    <div className="wizard-container max-w-4xl mx-auto py-6">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Viral Content Wizard</h1>
        <button 
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Dashboard
        </button>
      </header>
      
      <div className="wizard-progress mb-8">
        <div className="progress-steps flex relative">
          <div className="progress-bar absolute h-1 bg-gray-200 top-4 left-0 right-0 z-0"></div>
          <div 
            className="progress-bar-fill absolute h-1 bg-purple-600 top-4 left-0 z-0 transition-all duration-300"
            style={{ 
              width: `${
                currentStep === "idea" ? 0 :
                currentStep === "hook" ? 25 :
                currentStep === "structure" ? 50 :
                currentStep === "captions" ? 75 : 100
              }%` 
            }}
          ></div>
          
          {["idea", "hook", "structure", "captions", "performance"].map((step, index) => (
            <div key={step} className="step-container flex-1 relative z-10 flex flex-col items-center">
              <div 
                className={`step-circle w-8 h-8 rounded-full flex items-center justify-center font-medium
                  ${currentStep === step ? 
                    "bg-purple-600 text-white" : 
                    index <= ["idea", "hook", "structure", "captions", "performance"].indexOf(currentStep as string) ?
                    "bg-purple-600 text-white" : "bg-white text-gray-400 border border-gray-300"
                  }
                `}
              >
                {index + 1}
              </div>
              <div className="step-label text-xs mt-2 text-center">
                {step === "idea" ? "Content Idea" :
                 step === "hook" ? "Hook Generator" :
                 step === "structure" ? "Structure" :
                 step === "captions" ? "Captions" : "Performance"}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="wizard-content bg-white rounded-lg shadow-md p-6">
        {renderStep()}
      </div>
    </div>
  );
}