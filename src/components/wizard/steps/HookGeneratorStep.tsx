"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";

interface HookGeneratorStepProps {
  onNext: () => void;
  onBack: () => void;
}

const HOOK_TYPES = [
  { value: "question", label: "Question Hook", description: "Opens with a compelling question that makes viewers curious" },
  { value: "statistic", label: "Statistic Hook", description: "Starts with a surprising or shocking statistic" },
  { value: "story", label: "Story Hook", description: "Begins with a brief, engaging personal story" },
  { value: "controversial", label: "Controversial Hook", description: "Opens with a bold or unexpected statement" },
  { value: "problem", label: "Problem Hook", description: "Immediately presents a problem your audience relates to" },
];

export default function HookGeneratorStep({ onNext, onBack }: HookGeneratorStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);
  
  const [hookType, setHookType] = useState("");
  const [generatedHooks, setGeneratedHooks] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState("");
  
  const contentIdea = currentProject?.contentIdea?.contentIdea || "";
  const targetAudience = currentProject?.contentIdea?.targetAudience || "";
  
  const handleGenerateHooks = async () => {
    if (!hookType || !contentIdea || !targetAudience) return;
    
    dispatch(setLoading(true));
    
    try {
      const response = await fetch("/api/hooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentIdea,
          hookType,
          targetAudience
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      
      const data = await response.json();
      setGeneratedHooks(data);
      
    } catch (error) {
      dispatch(setError("Failed to generate hooks"));
      console.error("Error generating hooks:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const handleSaveAndContinue = () => {
    // Here you would dispatch to save the hook to Redux
    // For now we'll just continue to the next step
    onNext();
  };
  
  return (
    <div className="hook-generator-step">
      <h2 className="step-title text-xl font-bold mb-6 flex items-center">
        Hook Generator
        <WizardTooltip 
          title="Why Hooks Matter" 
          content="The first 3 seconds of your video determine if viewers will keep watching. A strong hook can increase watch time by 40% or more."
        />
      </h2>
      
      <div className="hook-type-selector mb-6">
        <h3 className="text-lg font-medium mb-3">Choose a Hook Type</h3>
        <div className="hook-types-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOOK_TYPES.map((type) => (
            <div 
              key={type.value}
              className={`hook-type-card p-4 border rounded-lg transition ${hookType === type.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
              onClick={() => setHookType(type.value)}
            >
              <h4 className="font-medium mb-1">{type.label}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="generate-button bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50 mb-6"
        onClick={handleGenerateHooks}
        disabled={loading || !hookType}
      >
        {loading ? "Generating..." : "Generate Hook Ideas"}
      </button>
      
      {generatedHooks && (
        <div className="generated-hooks bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Choose Your Hook</h3>
          
          <div className="hooks-list space-y-4">
            {generatedHooks.hooks.map((hook: any, i: number) => (
              <div 
                key={i}
                className={`hook-card p-4 border rounded-lg transition cursor-pointer ${selectedHook === hook.hook ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                onClick={() => setSelectedHook(hook.hook)}
              >
                <div className="hook-content mb-3">
                  <h4 className="font-medium mb-2">Option {i + 1}</h4>
                  <p className="hook-text text-lg mb-2">"{hook.hook}"</p>
                  <div className="effectiveness-meter bg-gray-200 h-2 rounded-full">
                    <div 
                      className="effectiveness-fill bg-green-500 h-full rounded-full"
                      style={{ width: `${hook.effectiveness * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-1 inline-block">Effectiveness: {hook.effectiveness}/10</span>
                </div>
                
                <div className="hook-explanation bg-white p-3 rounded border border-gray-100">
                  <h5 className="text-sm font-medium mb-1">Why This Works</h5>
                  <p className="text-sm text-gray-700">{hook.explanation}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="wizard-navigation flex justify-between mt-6">
            <button 
              className="back-button px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={onBack}
            >
              Back to Content Idea
            </button>
            
            <button 
              className="next-button bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
              onClick={handleSaveAndContinue}
              disabled={!selectedHook}
            >
              Continue to Content Structure
            </button>
          </div>
        </div>
      )}
    </div>
  );
}