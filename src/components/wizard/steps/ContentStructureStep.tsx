import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveContentStructure, setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";

interface ContentStructureStepProps {
  onNext: () => void;
  onBack: () => void;
}

const CONTENT_TYPES = [
  { value: "educational", label: "Educational" },
  { value: "entertainment", label: "Entertainment" },
  { value: "tutorial", label: "Tutorial/How-To" },
  { value: "storytelling", label: "Storytelling" },
  { value: "reaction", label: "Reaction" },
];

export default function ContentStructureStep({ onNext, onBack }: ContentStructureStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);

  // Initialize with existing data or defaults
  const [hook, setHook] = useState(currentProject?.contentStructure?.hook || currentProject?.hook?.selectedHook || "");
  const [middle, setMiddle] = useState(currentProject?.contentStructure?.middle || "");
  const [ending, setEnding] = useState(currentProject?.contentStructure?.ending || "");
  const [contentType, setContentType] = useState(currentProject?.contentStructure?.contentType || "");
  const [analysis, setAnalysis] = useState(currentProject?.contentStructure?.analysis || null);

  // For timeline visualization
  const [segments, setSegments] = useState([
    { id: "hook", label: "Hook", duration: 3, color: "#FF5C5C" },
    { id: "middle", label: "Middle Content", duration: 12, color: "#5C9AFF" },
    { id: "ending", label: "Ending/CTA", duration: 5, color: "#5CFF8F" },
  ]);

  const handleDurationChange = (id: string, newDuration: number) => {
    setSegments(segments.map(seg => 
      seg.id === id ? { ...seg, duration: newDuration } : seg
    ));
  };

  const handleAnalyzeStructure = async () => {
    if (!hook || !middle || !ending || !contentType) return;

    dispatch(setLoading(true));

    try {
      const response = await fetch("/api/ai/analyze-structure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hook,
          middle,
          ending,
          contentType,
        }),
      });

      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      dispatch(setError("Failed to analyze content structure"));
      console.error("Error analyzing structure:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSaveAndContinue = () => {
    dispatch(saveContentStructure({
      hook,
      middle,
      ending,
      contentType,
      analysis,
    }));

    onNext();
  };

  return (
    <div className="content-structure-step">
      <h2 className="step-title text-2xl font-bold mb-6 flex items-center">
        Content Structure
        <WizardTooltip
          title="Optimizing Structure"
          content="The structure of your video affects viewer retention. Proper pacing keeps viewers engaged through the full video."
        />
      </h2>

      <div className="content-structure-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="structure-inputs space-y-6">
          <div className="input-group">
            <label className="block mb-2 font-medium">
              Hook (First 3 seconds)
              <WizardTooltip
                title="Hook Tips"
                content="Your hook should immediately grab attention. Keep it under 3 seconds and get straight to the point."
              />
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Enter your hook (what you'll say/show in the first 3 seconds)"
              rows={2}
            />
          </div>

          <div className="input-group">
            <label className="block mb-2 font-medium">
              Middle Content
              <WizardTooltip
                title="Middle Content Tips"
                content="This is where you deliver your main value. Be concise and maintain the energy from your hook."
              />
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              value={middle}
              onChange={(e) => setMiddle(e.target.value)}
              placeholder="Enter your main content (what comes after the hook)"
              rows={4}
            />
          </div>

          <div className="input-group">
            <label className="block mb-2 font-medium">
              Ending/Call-to-Action
              <WizardTooltip
                title="CTA Tips"
                content="End with a clear next step for viewers. This increases engagement and algorithm performance."
              />
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              value={ending}
              onChange={(e) => setEnding(e.target.value)}
              placeholder="Enter your ending or call-to-action"
              rows={2}
            />
          </div>

          <div className="input-group">
            <label className="block mb-2 font-medium">Content Type</label>
            <div className="content-type-options flex flex-wrap gap-2">
              {CONTENT_TYPES.map((type) => (
                <div
                  key={type.value}
                  className={`content-type-option px-4 py-2 border rounded-md cursor-pointer transition ${
                    contentType === type.value
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setContentType(type.value)}
                >
                  {type.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="structure-visualization">
          <h3 className="text-lg font-medium mb-4">Video Timeline</h3>
          <p className="timeline-help text-sm text-gray-500 mb-4">Adjust the timing for each segment</p>

          <div className="timeline-container w-full mb-6">
            {segments.map((segment) => (
              <div
                key={segment.id}
                className="timeline-segment mb-4"
              >
                <div 
                  className="segment-bar h-12 rounded-md flex items-center justify-center text-white font-medium mb-2"
                  style={{
                    backgroundColor: segment.color,
                    width: `${segment.duration * 5}%`
                  }}
                >
                  {segment.label}
                </div>
                <div className="segment-duration flex items-center">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={segment.duration}
                    onChange={(e) => handleDurationChange(segment.id, parseInt(e.target.value))}
                    className="w-full mr-2"
                  />
                  <span className="text-sm text-gray-600 w-12">{segment.duration}s</span>
                </div>
              </div>
            ))}
          </div>

          <div className="timeline-tips space-y-3">
            <div className="tip flex items-start">
              <div className="tip-icon mr-2 text-lg">💡</div>
              <div className="tip-content text-sm text-gray-600">
                <strong>Optimal Timing:</strong> For TikTok & Reels, aim for 15-30 seconds total length
              </div>
            </div>
            <div className="tip flex items-start">
              <div className="tip-icon mr-2 text-lg">💡</div>
              <div className="tip-content text-sm text-gray-600">
                <strong>Hook Duration:</strong> First 3 seconds are critical - make them count!
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        className="analyze-button w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed my-8"
        onClick={handleAnalyzeStructure}
        disabled={loading || !hook || !middle || !ending || !contentType}
      >
        {loading ? "Analyzing..." : "Analyze Structure"}
      </button>

      {analysis && (
        <div className="analysis-results p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Structure Analysis</h3>

          <div className="structure-score flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div className="score-circle w-24 h-24 rounded-full border-4 border-purple-600 flex flex-col items-center justify-center">
              <div className="score-number text-3xl font-bold text-purple-600">{analysis.score}</div>
              <div className="score-label text-sm text-gray-600">/ 10</div>
            </div>
            <div className="score-breakdown flex-1 ml-6">
              <div className="breakdown-item mb-2">
                <span className="item-label font-medium">Pacing:</span>
                <span className="item-value ml-2">{analysis.pacing}</span>
              </div>
              <div className="breakdown-item">
                <span className="item-label font-medium">Transitions:</span>
                <span className="item-value ml-2">{analysis.transitions}</span>
              </div>
            </div>
          </div>

          <div className="strengths-improvements grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="strengths">
              <h4 className="font-bold text-green-600 mb-2">Strengths</h4>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.strengths.map((strength: string, i: number) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="improvements">
              <h4 className="font-bold text-amber-600 mb-2">Areas for Improvement</h4>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.improvements.map((improvement: string, i: number) => (
                  <li key={i}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="wizard-navigation flex justify-between mt-6">
            <button
              className="back-button px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition"
              onClick={onBack}
            >
              Back to Hook Generator
            </button>
            <button
              className="next-button px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              onClick={handleSaveAndContinue}
            >
              Continue to Captions & Hashtags
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
