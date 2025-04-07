"use client";

import { useState, useEffect } from "react";
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

// Mock data for local testing if API fails
const MOCK_HOOKS = {
  hooks: [
    {
      hook: "Did you know 80% of people are doing this wrong? Here's what the pros don't want you to know...",
      explanation: "This hook creates immediate curiosity by suggesting insider knowledge and plays on the fear of missing out or doing something incorrectly.",
      effectiveness: 9
    },
    {
      hook: "I tried every trending method for 30 days. Only this one actually worked...",
      explanation: "This hook leverages personal experience and the promise of a solution that's been tested, creating authority and trust.",
      effectiveness: 8
    },
    {
      hook: "This 10-second trick changed everything for me (and it will for you too)...",
      explanation: "This hook promises a quick, easy solution with guaranteed results, appealing to the audience's desire for simple fixes.",
      effectiveness: 7
    }
  ]
};

export default function HookGeneratorStep({ onNext, onBack }: HookGeneratorStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);
  
  const [hookType, setHookType] = useState("");
  const [generatedHooks, setGeneratedHooks] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState("");
  const [error, setErrorMessage] = useState("");
  
  const contentIdea = currentProject?.contentIdea?.contentIdea || "";
  const targetAudience = currentProject?.contentIdea?.targetAudience || "";
  
  // Debug log for current project data
  useEffect(() => {
    console.log("Current project data:", currentProject);
  }, [currentProject]);
  
  const handleGenerateHooks = async () => {
    if (!hookType) {
      setErrorMessage("Please select a hook type first");
      return;
    }
    
    if (!contentIdea || !targetAudience) {
      setErrorMessage("Missing content idea or target audience. Please go back and complete the Content Idea step.");
      return;
    }
    
    setErrorMessage("");
    dispatch(setLoading(true));
    console.log("Generating hooks for:", { contentIdea, hookType, targetAudience });
    
    try {
      // For debugging, let's first try using mock data
      // Comment out the fetch call and uncomment the line below for testing
      // setGeneratedHooks(MOCK_HOOKS);
      // return;
      
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
      
      console.log("API response status:", response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("API error response:", errorData);
        throw new Error(`API returned ${response.status}: ${errorData?.error || 'Unknown error'}`);
      }
      
      const data = await response.json();
      console.log("API response data:", data);
      
      if (data && data.hooks && data.hooks.length > 0) {
        setGeneratedHooks(data);
      } else {
        // If we get an empty or invalid response, use mock data
        console.warn("Invalid API response, using mock data instead");
        setGeneratedHooks(MOCK_HOOKS);
      }
      
    } catch (error) {
      console.error("Error generating hooks:", error);
      setErrorMessage(`Failed to generate hooks: ${error instanceof Error ? error.message : 'Unknown error'}`);
      dispatch(setError("Failed to generate hooks"));
      
      // Fallback to mock data on error
      console.log("Using mock data due to error");
      setGeneratedHooks(MOCK_HOOKS);
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
    <div className="hook-generator-step p-6">
      <h2 className="step-title text-xl font-bold mb-6 flex items-center">
        Hook Generator
        <WizardTooltip 
          title="Why Hooks Matter" 
          content="The first 3 seconds of your video determine if viewers will keep watching. A strong hook can increase watch time by 40% or more."
        />
      </h2>
      
      {error && (
        <div className="error-message bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="hook-type-selector mb-6">
        <h3 className="text-lg font-medium mb-3">Choose a Hook Type</h3>
        <div className="hook-types-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOOK_TYPES.map((type) => (
            <div 
              key={type.value}
              className={`hook-type-card p-4 border rounded-lg transition cursor-pointer ${hookType === type.value ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
              onClick={() => setHookType(type.value)}
            >
              <h4 className="font-medium mb-1">{type.label}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <button 
          className="generate-button bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50"
          onClick={handleGenerateHooks}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Hook Ideas"}
        </button>
        
        {/* Debug info - remove in production */}
        <div className="mt-2 text-xs text-gray-500">
          Selected hook type: {hookType || 'None'}
        </div>
      </div>
      
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