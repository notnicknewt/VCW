"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";

interface ContentIdeaStepProps {
  onNext: () => void;
}

export default function ContentIdeaStep({ onNext }: ContentIdeaStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);
  
  const [contentIdea, setContentIdea] = useState(currentProject?.contentIdea?.contentIdea || "");
  const [targetAudience, setTargetAudience] = useState(currentProject?.contentIdea?.targetAudience || "");
  const [contentGoal, setContentGoal] = useState(currentProject?.contentIdea?.contentGoal || "");
  
  const handleContinue = () => {
    // Here you would normally save the content idea to Redux
    // For now, let's just log it and continue
    console.log("Content idea data:", { contentIdea, targetAudience, contentGoal });
    
    // Store data in localStorage for testing
    localStorage.setItem("vcw_content_idea", JSON.stringify({ 
      contentIdea, 
      targetAudience, 
      contentGoal
    }));
    
    onNext();
  };
  
  return (
    <div className="content-idea-step p-6">
      <h2 className="step-title text-xl font-bold mb-6 flex items-center">
        Content Idea
        <WizardTooltip 
          title="Why Your Idea Matters" 
          content="Your content idea forms the foundation of your viral video. A strong, clearly defined idea helps viewers understand your message quickly."
        />
      </h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">
            What's your content idea?
            <WizardTooltip 
              title="Content Idea Tips" 
              content="The best viral ideas are simple, relatable, and create an emotional response. Aim for a concept that can be understood in 1-2 sentences."
            />
          </label>
          <textarea 
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Describe your short-form video idea here..."
            rows={4}
            value={contentIdea}
            onChange={(e) => setContentIdea(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">
            Who's your target audience?
            <WizardTooltip 
              title="Target Audience Importance" 
              content="Highly specific target audiences help algorithms show your content to the right people. Be specific about age, interests, and pain points."
            />
          </label>
          <input 
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Female fitness enthusiasts, 25-34, who struggle with workout motivation"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">
            What's your content goal?
            <WizardTooltip 
              title="Content Goal" 
              content="Having a clear goal helps structure your content effectively. Are you educating, entertaining, inspiring, or selling?"
            />
          </label>
          <input 
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., To educate viewers about quick morning workout routines"
            value={contentGoal}
            onChange={(e) => setContentGoal(e.target.value)}
          />
        </div>
      </div>
      
      <div className="text-center">
        <button 
          className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          onClick={handleContinue}
          disabled={!contentIdea || !targetAudience || !contentGoal}
        >
          Continue to Hook Generator
        </button>
      </div>
    </div>
  );
}