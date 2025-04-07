"use client";

import { useState } from "react";
import ContentIdeaStep from "./steps/ContentIdeaStep";
import HookGeneratorStep from "./steps/HookGeneratorStep";

export type WizardStep = "idea" | "hook" | "structure" | "captions" | "performance";

export default function WizardLayout() {
  const [currentStep, setCurrentStep] = useState<WizardStep>("idea");
  
  const renderStep = () => {
    switch(currentStep) {
      case "idea":
        return <ContentIdeaStep onNext={() => setCurrentStep("hook")} />;
      case "hook":
        return <HookGeneratorStep 
          onNext={() => setCurrentStep("structure")} 
          onBack={() => setCurrentStep("idea")} 
        />;
      case "structure":
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Content Structure</h2>
            <p className="text-gray-600 mb-6">
              This step will help you structure your video content.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <p className="text-yellow-700">
                The Content Structure Builder is coming soon! This feature will provide a visual timeline 
                and help you organize your content for maximum viewer retention.
              </p>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep("hook")} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep("captions")} 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case "captions":
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Captions & Hashtags</h2>
            <p className="text-gray-600 mb-6">
              This step will help you create engaging captions and strategic hashtags.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <p className="text-yellow-700">
                The Captions & Hashtags Generator is coming soon! This feature will help you create 
                compelling captions and strategic hashtags for maximum reach.
              </p>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep("structure")} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button 
                onClick={() => setCurrentStep("performance")} 
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case "performance":
        return (
          <div className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Performance Analysis</h2>
            <p className="text-gray-600 mb-6">
              This step will help you track and analyze your content performance.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
              <p className="text-yellow-700">
                The Performance Analysis tool is coming soon! This feature will help you track 
                metrics and get actionable insights to improve future content.
              </p>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep("captions")} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Back
              </button>
              <button 
                className="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
              >
                Complete
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="wizard-container max-w-4xl mx-auto p-6">
      <div className="wizard-progress mb-8">
        <div className="progress-bar bg-gray-200 h-2 rounded-full">
          <div 
            className="progress-fill bg-purple-600 h-full rounded-full transition-all"
            style={{ 
              width: 
                currentStep === "idea" ? "20%" :
                currentStep === "hook" ? "40%" :
                currentStep === "structure" ? "60%" :
                currentStep === "captions" ? "80%" : "100%" 
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <div className={`step-label text-xs ${currentStep === "idea" ? "text-purple-600 font-bold" : ""}`}>Content Idea</div>
          <div className={`step-label text-xs ${currentStep === "hook" ? "text-purple-600 font-bold" : ""}`}>Hook</div>
          <div className={`step-label text-xs ${currentStep === "structure" ? "text-purple-600 font-bold" : ""}`}>Structure</div>
          <div className={`step-label text-xs ${currentStep === "captions" ? "text-purple-600 font-bold" : ""}`}>Captions</div>
          <div className={`step-label text-xs ${currentStep === "performance" ? "text-purple-600 font-bold" : ""}`}>Performance</div>
        </div>
      </div>
      
      <div className="wizard-content bg-white rounded-lg shadow-md">
        {renderStep()}
      </div>
    </div>
  );
}