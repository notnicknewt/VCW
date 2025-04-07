"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WizardTooltip from "../WizardTooltip";
import ScoreVisualization from "../ScoreVisualization";
import { RootState } from "@/store";

interface ContentIdeaStepProps {
  onNext?: () => void;
}

export default function ContentIdeaStep({ onNext }: ContentIdeaStepProps) {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.projects);
  
  const [contentIdea, setContentIdea] = useState(currentProject?.contentIdea?.text || "");
  const [targetAudience, setTargetAudience] = useState(currentProject?.contentIdea?.audience || "");
  const [contentGoal, setContentGoal] = useState(currentProject?.contentIdea?.goal || "");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  const handleAnalyze = async () => {
    if (!contentIdea || !targetAudience || !contentGoal) return;
    
    setLoading(true);
    
    try {
      // Mock analysis response - would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockAnalysis = {
        score: 7,
        strengths: [
          "Clearly addresses a specific audience",
          "Has potential for emotional connection",
          "Tackles a relatable pain point"
        ],
        weaknesses: [
          "Lacks a unique hook or twist",
          "Could be too generic for the platform",
          "Might be difficult to convey in short-form"
        ],
        improvements: [
          {
            suggestion: "Add a surprising statistic or contrarian view to hook viewers",
            reasoning: "Opening with unexpected information creates immediate curiosity and stops scrolling"
          },
          {
            suggestion: "Include a specific personal story example",
            reasoning: "Personal examples increase authenticity and emotional connection"
          },
          {
            suggestion: "End with a clear, specific action for viewers",
            reasoning: "Clear CTAs improve engagement metrics and algorithm performance"
          }
        ],
        analysis: "This content idea has good potential but needs more uniqueness and specificity to truly stand out in a crowded feed. Adding emotional triggers and unexpected elements would significantly improve virality potential."
      };
      
      setAnalysis(mockAnalysis);
      
      // You would dispatch to Redux store here with real implementation
      // dispatch(saveContentIdea({
      //   contentIdea,
      //   targetAudience,
      //   contentGoal,
      //   analysis: mockAnalysis
      // }));
      
    } catch (error) {
      console.error("Error analyzing content idea:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="content-idea-step">
      <h2 className="step-title text-xl font-bold mb-6 flex items-center">
        Content Idea
        <WizardTooltip 
          title="Why Your Idea Matters" 
          content="Your content idea forms the foundation of your viral video. A strong, clearly defined idea helps viewers understand your message quickly."
        />
      </h2>
      
      <div className="input-group mb-4">
        <label className="block mb-2 font-medium flex items-center">
          What's your content idea?
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
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="input-group mb-4">
        <label className="block mb-2 font-medium flex items-center">
          Who's your target audience?
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
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <div className="input-group mb-6">
        <label className="block mb-2 font-medium flex items-center">
          What's your content goal?
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
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      
      <button 
        className="analyze-button bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition disabled:opacity-50 mb-6"
        onClick={handleAnalyze}
        disabled={loading || !contentIdea || !targetAudience || !contentGoal}
      >
        {loading ? "Analyzing..." : "Analyze Viral Potential"}
      </button>
      
      {analysis && (
        <div className="analysis-results bg-gray-50 p-6 rounded-md border border-gray-200">
          <h3 className="text-lg font-bold mb-4">Analysis Results</h3>
          
          <ScoreVisualization score={analysis.score} />
          
          <div className="strengths-weaknesses grid md:grid-cols-2 gap-4 mb-6">
            <div className="strengths bg-green-50 p-4 rounded-md border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">Strengths</h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.strengths.map((strength: string, i: number) => (
                  <li key={i} className="text-green-700">{strength}</li>
                ))}
              </ul>
            </div>
            
            <div className="weaknesses bg-red-50 p-4 rounded-md border border-red-100">
              <h4 className="font-bold text-red-800 mb-2">Weaknesses</h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.weaknesses.map((weakness: string, i: number) => (
                  <li key={i} className="text-red-700">{weakness}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="improvement-suggestions mb-6">
            <h4 className="font-bold mb-3">Suggested Improvements</h4>
            <div className="space-y-4">
              {analysis.improvements.map((improvement: any, i: number) => (
                <div key={i} className="improvement-item bg-white p-4 rounded-md border border-gray-200">
                  <p className="suggestion font-medium mb-1"><strong>Try this:</strong> {improvement.suggestion}</p>
                  <p className="reasoning text-sm text-gray-600"><strong>Why:</strong> {improvement.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
          
          {onNext && (
            <button 
              className="next-step-button bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition w-full"
              onClick={onNext}
            >
              Continue to Hook Generator
            </button>
          )}
        </div>
      )}
    </div>
  );
}