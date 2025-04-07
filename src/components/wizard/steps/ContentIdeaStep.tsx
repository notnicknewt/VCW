import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveContentIdea, setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";
import ScoreVisualization from "../ScoreVisualization";

interface ContentIdeaStepProps {
  onNext: () => void;
}

export default function ContentIdeaStep({ onNext }: ContentIdeaStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);

  const [contentIdea, setContentIdea] = useState(currentProject?.contentIdea?.contentIdea || "");
  const [targetAudience, setTargetAudience] = useState(currentProject?.contentIdea?.targetAudience || "");
  const [contentGoal, setContentGoal] = useState(currentProject?.contentIdea?.contentGoal || "");
  const [analysis, setAnalysis] = useState(currentProject?.contentIdea?.analysis || null);

  const handleAnalyze = async () => {
    if (!contentIdea || !targetAudience || !contentGoal) return;

    dispatch(setLoading(true));

    try {
      const response = await fetch("/api/ai/analyze-idea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentIdea, targetAudience, contentGoal }),
      });

      const data = await response.json();
      setAnalysis(data);

      dispatch(saveContentIdea({
        contentIdea,
        targetAudience,
        contentGoal,
        analysis: data
      }));
    } catch (error) {
      dispatch(setError("Failed to analyze content idea"));
      console.error("Error analyzing content idea:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="content-idea-step">
      <h2 className="step-title text-2xl font-bold mb-6 flex items-center">
        Content Idea
        <WizardTooltip
          title="Why Your Idea Matters"
          content="Your content idea forms the foundation of your viral video. A strong, clearly defined idea helps viewers understand your message quickly."
        />
      </h2>

      <div className="input-group mb-6">
        <label className="block mb-2 font-medium">
          What's your content idea?
          <WizardTooltip
            title="Content Idea Tips"
            content="The best viral ideas are simple, relatable, and create an emotional response. Aim for a concept that can be understood in 1-2 sentences."
          />
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md"
          value={contentIdea}
          onChange={(e) => setContentIdea(e.target.value)}
          placeholder="Describe your short-form video idea here..."
          rows={4}
        />
      </div>

      <div className="input-group mb-6">
        <label className="block mb-2 font-medium">
          Who's your target audience?
          <WizardTooltip
            title="Target Audience Importance"
            content="Highly specific target audiences help algorithms show your content to the right people. Be specific about age, interests, and pain points."
          />
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g., Female fitness enthusiasts, 25-34, who struggle with workout motivation"
        />
      </div>

      <div className="input-group mb-6">
        <label className="block mb-2 font-medium">
          What's your content goal?
          <WizardTooltip
            title="Content Goal"
            content="Having a clear goal helps structure your content effectively. Are you educating, entertaining, inspiring, or selling?"
          />
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={contentGoal}
          onChange={(e) => setContentGoal(e.target.value)}
          placeholder="e.g., To educate viewers about quick morning workout routines"
        />
      </div>

      <button
        className="analyze-button w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        onClick={handleAnalyze}
        disabled={loading || !contentIdea || !targetAudience || !contentGoal}
      >
        {loading ? "Analyzing..." : "Analyze Viral Potential"}
      </button>

      {analysis && (
        <div className="analysis-results p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Analysis Results</h3>
          <ScoreVisualization score={analysis.score} />

          <div className="strengths-weaknesses grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="strengths">
              <h4 className="font-bold text-green-600 mb-2">Strengths</h4>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.strengths.map((strength: string, i: number) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>

            <div className="weaknesses">
              <h4 className="font-bold text-red-600 mb-2">Weaknesses</h4>
              <ul className="list-disc pl-5 space-y-2">
                {analysis.weaknesses.map((weakness: string, i: number) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="improvement-suggestions mb-6">
            <h4 className="font-bold text-lg mb-3">Suggested Improvements</h4>
            {analysis.improvements.map((improvement: any, i: number) => (
              <div key={i} className="improvement-item mb-4 p-4 bg-white rounded-md border border-gray-200">
                <p className="suggestion font-medium mb-2"><strong>Try this:</strong> {improvement.suggestion}</p>
                <p className="reasoning text-gray-600"><strong>Why:</strong> {improvement.reasoning}</p>
              </div>
            ))}
          </div>

          <button
            className="next-step-button w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            onClick={onNext}
          >
            Continue to Hook Generator
          </button>
        </div>
      )}
    </div>
  );
}
