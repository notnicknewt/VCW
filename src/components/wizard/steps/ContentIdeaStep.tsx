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
        body: JSON.stringify({
          contentIdea,
          targetAudience,
          contentGoal
        }),
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
      <h2 className="step-title">
        Content Idea
        <WizardTooltip 
          title="Why Your Idea Matters" 
          content="Your content idea forms the foundation of your viral video. A strong, clearly defined idea helps viewers understand your message quickly."
        />
      </h2>
      
      <div className="input-group">
        <label>
          What\'s your content idea?
          <WizardTooltip 
            title="Content Idea Tips" 
            content="The best viral ideas are simple, relatable, and create an emotional response. Aim for a concept that can be understood in 1-2 sentences."
          />
        </label>
        <textarea 
          value={contentIdea}
          onChange={(e) => setContentIdea(e.target.value)}
          placeholder="Describe your short-form video idea here..."
          rows={4}
        />
      </div>
      
      <div className="input-group">
        <label>
          Who\'s your target audience?
          <WizardTooltip 
            title="Target Audience Importance" 
            content="Highly specific target audiences help algorithms show your content to the right people. Be specific about age, interests, and pain points."
          />
        </label>
        <input 
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
          placeholder="e.g., Female fitness enthusiasts, 25-34, who struggle with workout motivation"
        />
      </div>
      
      <div className="input-group">
        <label>
          What\'s your content goal?
          <WizardTooltip 
            title="Content Goal" 
            content="Having a clear goal helps structure your content effectively. Are you educating, entertaining, inspiring, or selling?"
          />
        </label>
        <input 
          type="text"
          value={contentGoal}
          onChange={(e) => setContentGoal(e.target.value)}
          placeholder="e.g., To educate viewers about quick morning workout routines"
        />
      </div>
      
      <button 
        className="analyze-button"
        onClick={handleAnalyze}
        disabled={loading || !contentIdea || !targetAudience || !contentGoal}
      >
        {loading ? "Analyzing..." : "Analyze Viral Potential"}
      </button>
      
      {analysis && (
        <div className="analysis-results">
          <h3>Analysis Results</h3>
          
          <div className="score-visualization">
            <div className="score-circle">
              <div className="score-number">{analysis.score}</div>
              <span>/10</span>
            </div>
            <div className="score-label">Viral Potential</div>
          </div>
          
          <div className="strengths-weaknesses">
            <div className="strengths">
              <h4>Strengths</h4>
              <ul>
                {analysis.strengths.map((strength: string, i: number) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div className="weaknesses">
              <h4>Weaknesses</h4>
              <ul>
                {analysis.weaknesses.map((weakness: string, i: number) => (
                  <li key={i}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="improvement-suggestions">
            <h4>Suggested Improvements</h4>
            {analysis.improvements.map((improvement: any, i: number) => (
              <div key={i} className="improvement-item">
                <p className="suggestion"><strong>Try this:</strong> {improvement.suggestion}</p>
                <p className="reasoning"><strong>Why:</strong> {improvement.reasoning}</p>
              </div>
            ))}
          </div>
          
          <button className="next-step-button" onClick={onNext}>
            Continue to Hook Generator
          </button>
        </div>
      )}
    </div>
  );
}
