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
        body: JSON.stringify({ contentIdea, hookType, targetAudience }),
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
    dispatch(saveHook({ hookType, selectedHook, generatedHooks }));
    onNext();
  };

  return (
    <div className="hook-generator-step">
      <h2 className="step-title text-2xl font-bold mb-6 flex items-center">
        Hook Generator
        <WizardTooltip
          title="Why Hooks Matter"
          content="The first 3 seconds of your video determine if viewers will keep watching. A strong hook can increase watch time by 40% or more."
        />
      </h2>

      <div className="hook-type-selector mb-8">
        <h3 className="text-lg font-medium mb-4">Choose a Hook Type</h3>
        <div className="hook-types-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HOOK_TYPES.map((type) => (
            <div
              key={type.value}
              className={`hook-type-card p-4 border rounded-lg cursor-pointer transition ${
                hookType === type.value
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              }`}
              onClick={() => setHookType(type.value)}
            >
              <h4 className="font-bold mb-1">{type.label}</h4>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="generate-button w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        onClick={handleGenerateHooks}
        disabled={loading || !hookType}
      >
        {loading ? "Generating..." : "Generate Hook Ideas"}
      </button>

      {generatedHooks && (
        <div className="generated-hooks">
          <h3 className="text-lg font-medium mb-4">Choose Your Hook</h3>

          <div className="hooks-list space-y-6">
            {generatedHooks.hooks.map((hook: any, i: number) => (
              <div
                key={i}
                className={`hook-card p-5 border rounded-lg cursor-pointer transition ${
                  selectedHook === hook.hook ? "border-purple-600 bg-purple-50" : "border-gray-200 hover:border-purple-300"
                }`}
                onClick={() => setSelectedHook(hook.hook)}
              >
                <div className="hook-content mb-4">
                  <h4 className="text-lg font-medium mb-2">Option {i + 1}</h4>
                  <p className="hook-text text-lg mb-3 p-3 bg-white rounded border border-gray-200">{hook.hook}</p>
                  <div className="effectiveness-meter w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="effectiveness-fill h-full bg-purple-600"
                      style={{ width: `${hook.effectiveness * 10}%` }}
                    ></div>
                    <span className="text-sm text-gray-500 mt-1 block">Effectiveness: {hook.effectiveness}/10</span>
                  </div>
                </div>

                <div className="hook-explanation p-3 bg-gray-50 rounded">
                  <h5 className="font-medium mb-1">Why This Works</h5>
                  <p className="text-sm text-gray-600">{hook.explanation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="wizard-navigation mt-8 flex justify-between">
            <button
              className="back-button px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              onClick={onBack}
            >
              Back to Content Idea
            </button>
            <button
              className="next-button px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
