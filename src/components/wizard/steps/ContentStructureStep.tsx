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
          contentType
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
      analysis
    }));
    
    onNext();
  };
  
  return (
    <div className="content-structure-step">
      <h2 className="step-title">
        Content Structure
        <WizardTooltip 
          title="Optimizing Structure" 
          content="The structure of your video affects viewer retention. Proper pacing keeps viewers engaged through the full video."
        />
      </h2>
      
      <div className="content-structure-grid">
        <div className="structure-inputs">
          <div className="input-group">
            <label>
              Hook (First 3 seconds)
              <WizardTooltip 
                title="Hook Tips" 
                content="Your hook should immediately grab attention. Keep it under 3 seconds and get straight to the point."
              />
            </label>
            <textarea 
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Enter your hook (what you\'ll say/show in the first 3 seconds)"
              rows={2}
            />
          </div>
          
          <div className="input-group">
            <label>
              Middle Content
              <WizardTooltip 
                title="Middle Content Tips" 
                content="This is where you deliver your main value. Be concise and maintain the energy from your hook."
              />
            </label>
            <textarea 
              value={middle}
              onChange={(e) => setMiddle(e.target.value)}
              placeholder="Enter your main content (what comes after the hook)"
              rows={4}
            />
          </div>
          
          <div className="input-group">
            <label>
              Ending/Call-to-Action
              <WizardTooltip 
                title="CTA Tips" 
                content="End with a clear next step for viewers. This increases engagement and algorithm performance."
              />
            </label>
            <textarea 
              value={ending}
              onChange={(e) => setEnding(e.target.value)}
              placeholder="Enter your ending or call-to-action"
              rows={2}
            />
          </div>
          
          <div className="input-group">
            <label>Content Type</label>
            <div className="content-type-options">
              {CONTENT_TYPES.map((type) => (
                <div 
                  key={type.value}
                  className={`content-type-option ${contentType === type.value ? "selected" : ""}`}
                  onClick={() => setContentType(type.value)}
                >
                  {type.label}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="structure-visualization">
          <h3>Video Timeline</h3>
          <p className="timeline-help">Adjust the timing for each segment</p>
          
          <div className="timeline-container">
            {segments.map((segment) => (
              <div
                key={segment.id}
                className="timeline-segment"
                style={{
                  backgroundColor: segment.color,
                  width: `${segment.duration * 5}%`
                }}
              >
                <div className="segment-label">{segment.label}</div>
                <div className="segment-duration">
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    value={segment.duration}
                    onChange={(e) => handleDurationChange(segment.id, parseInt(e.target.value))}
                  />
                  <span>{segment.duration}s</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="timeline-tips">
            <div className="tip">
              <div className="tip-icon">💡</div>
              <div className="tip-content">
                <strong>Optimal Timing:</strong> For TikTok & Reels, aim for 15-30 seconds total length
              </div>
            </div>
            <div className="tip">
              <div className="tip-icon">💡</div>
              <div className="tip-content">
                <strong>Hook Duration:</strong> First 3 seconds are critical - make them count!
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        className="analyze-button"
        onClick={handleAnalyzeStructure}
        disabled={loading || !hook || !middle || !ending || !contentType}
      >
        {loading ? "Analyzing..." : "Analyze Structure"}
      </button>
      
      {analysis && (
        <div className="analysis-results">
          <h3>Structure Analysis</h3>
          
          <div className="structure-score">
            <div className="score-circle">
              <div className="score-number">{analysis.score}</div>
              <div className="score-label">/ 10</div>
            </div>
            
            <div className="score-breakdown">
              <div className="breakdown-item">
                <span className="item-label">Pacing:</span> 
                <span className="item-value">{analysis.pacing}</span>
              </div>
              <div className="breakdown-item">
                <span className="item-label">Transitions:</span> 
                <span className="item-value">{analysis.transitions}</span>
              </div>
            </div>
          </div>
          
          <div className="strengths-improvements">
            <div className="strengths">
              <h4>Strengths</h4>
              <ul>
                {analysis.strengths.map((strength: string, i: number) => (
                  <li key={i}>{strength}</li>
                ))}
              </ul>
            </div>
            
            <div className="improvements">
              <h4>Areas for Improvement</h4>
              <ul>
                {analysis.improvements.map((improvement: string, i: number) => (
                  <li key={i}>{improvement}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="wizard-navigation">
            <button className="back-button" onClick={onBack}>
              Back to Hook Generator
            </button>
            
            <button 
              className="next-button"
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
