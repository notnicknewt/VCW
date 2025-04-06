import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveHook, setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";

const HOOK_TYPES = [
  { value: "question", label: "Question Hook", description: "Opens with a compelling question that makes viewers curious" },
  { value: "statistic", label: "Statistic Hook", description: "Starts with a surprising or shocking statistic" },
  { value: "story", label: "Story Hook", description: "Begins with a brief, engaging personal story" },
  { value: "controversial", label: "Controversial Hook", description: "Opens with a bold or unexpected statement" },
  { value: "problem", label: "Problem Hook", description: "Immediately presents a problem your audience relates to" },
];

interface HookGeneratorStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function HookGeneratorStep({ onNext, onBack }: HookGeneratorStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);
  
  const [hookType, setHookType] = useState(currentProject?.hook?.hookType || "");
  const [generatedHooks, setGeneratedHooks] = useState(currentProject?.hook?.generatedHooks || null);
  const [selectedHook, setSelectedHook] = useState(currentProject?.hook?.selectedHook || "");
  
  const contentIdea = currentProject?.contentIdea?.contentIdea || "";
  const targetAudience = currentProject?.contentIdea?.targetAudience || "";
  
  const handleGenerateHooks = async () => {
    if (!hookType) return;
    
    dispatch(setLoading(true));
    
    try {
      const response = await fetch("/api/ai/generate-hooks", {
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
    dispatch(saveHook({
      hookType,
      selectedHook,
      generatedHooks
    }));
    
    onNext();
  };
  
  return (
    <div className="hook-generator-step">
      <h2 className="step-title">
        Hook Generator
        <WizardTooltip 
          title="Why Hooks Matter" 
          content="The first 3 seconds of your video determine if viewers will keep watching. A strong hook can increase watch time by 40% or more."
        />
      </h2>
      
      <div className="hook-type-selector">
        <h3>Choose a Hook Type</h3>
        <div className="hook-types-grid">
          {HOOK_TYPES.map((type) => (
            <div 
              key={type.value}
              className={`hook-type-card ${hookType === type.value ? "selected" : ""}`}
              onClick={() => setHookType(type.value)}
            >
              <h4>{type.label}</h4>
              <p>{type.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="generate-button"
        onClick={handleGenerateHooks}
        disabled={loading || !hookType}
      >
        {loading ? "Generating..." : "Generate Hook Ideas"}
      </button>
      
      {generatedHooks && (
        <div className="generated-hooks">
          <h3>Choose Your Hook</h3>
          
          <div className="hooks-list">
            {generatedHooks.hooks.map((hook: any, i: number) => (
              <div 
                key={i}
                className={`hook-card ${selectedHook === hook.hook ? "selected" : ""}`}
                onClick={() => setSelectedHook(hook.hook)}
              >
                <div className="hook-content">
                  <h4>Option {i + 1}</h4>
                  <p className="hook-text">{hook.hook}</p>
                  <div className="effectiveness-meter">
                    <div 
                      className="effectiveness-fill"
                      style={{ width: `${hook.effectiveness * 10}%` }}
                    ></div>
                    <span>Effectiveness: {hook.effectiveness}/10</span>
                  </div>
                </div>
                
                <div className="hook-explanation">
                  <h5>Why This Works</h5>
                  <p>{hook.explanation}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="wizard-navigation">
            <button className="back-button" onClick={onBack}>
              Back to Content Idea
            </button>
            
            <button 
              className="next-button"
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
