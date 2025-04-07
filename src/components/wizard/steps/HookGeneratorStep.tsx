"use client";

import { useState } from "react";
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

// Hardcoded mock data for each hook type
const MOCK_DATA: Record<string, any[]> = {
  question: [
    {
      hook: "Are you making these 3 fatal mistakes that are killing your social media growth?",
      explanation: "This question immediately creates anxiety and curiosity - viewers worry they might be making these mistakes and need to know what they are.",
      effectiveness: 9
    },
    {
      hook: "Want to know the secret technique that top creators never share?",
      explanation: "This appeals to the desire for exclusive information and creates an information gap the viewer wants to fill.",
      effectiveness: 8
    },
    {
      hook: "What if everything you know about going viral is actually wrong?",
      explanation: "This challenges existing beliefs and creates cognitive dissonance that makes viewers want to resolve the tension by watching more.",
      effectiveness: 7
    }
  ],
  statistic: [
    {
      hook: "80% of viral videos share this one feature - and it's not what you think",
      explanation: "Using a specific percentage adds credibility while the twist at the end creates curiosity about what this unexpected feature might be.",
      effectiveness: 9
    },
    {
      hook: "New study shows only 3% of content creators do this simple trick that triples engagement",
      explanation: "This combines statistical rarity with the promise of a simple solution, making viewers feel they can gain exclusive knowledge.",
      effectiveness: 8
    },
    {
      hook: "I analyzed 100 viral videos and discovered this shocking pattern",
      explanation: "This establishes authority through research and promises to reveal an unexpected insight that viewers won't want to miss.",
      effectiveness: 7
    }
  ],
  story: [
    {
      hook: "I went from 0 to 100K followers in 30 days after making this one change...",
      explanation: "Personal transformation stories are highly compelling, and the promise of a simple change makes it feel achievable for viewers too.",
      effectiveness: 9
    },
    {
      hook: "My content was failing until a famous creator sent me this message...",
      explanation: "This creates curiosity about both the message and the famous person, while promising valuable advice that changed the creator's fortunes.",
      effectiveness: 8
    },
    {
      hook: "Last month I was about to quit, then this happened...",
      explanation: "The contrast between negative and positive outcomes creates emotional investment, and the vague 'this happened' creates a curiosity gap.",
      effectiveness: 7
    }
  ],
  controversial: [
    {
      hook: "Everything your favorite influencers tell you about growth is a complete lie",
      explanation: "This bold statement challenges established authorities and promises to reveal hidden truths, compelling viewers to watch to confirm or deny.",
      effectiveness: 9
    },
    {
      hook: "This 'forbidden' content strategy is why some creators blow up overnight",
      explanation: "The word 'forbidden' suggests exclusive, slightly taboo information that creates immediate interest and a sense of insider knowledge.",
      effectiveness: 8
    },
    {
      hook: "I'm about to show you why most social media advice is actually hurting your growth",
      explanation: "This contrarian view creates cognitive dissonance, especially for viewers who have been following common advice without success.",
      effectiveness: 7
    }
  ],
  problem: [
    {
      hook: "Struggling to get views? Here's the real reason your content isn't going viral",
      explanation: "This directly addresses a pain point and promises the 'real' solution, implying other solutions have been incorrect or incomplete.",
      effectiveness: 9
    },
    {
      hook: "If your reach suddenly dropped, this hidden algorithm change is probably why",
      explanation: "This targets a specific problem and attributes it to something outside the viewer's control but within their ability to adapt to - if they watch.",
      effectiveness: 8
    },
    {
      hook: "The number one reason new creators fail in their first 90 days",
      explanation: "This creates urgency for new creators while promising to help them avoid a common pitfall, making it highly relevant to the target audience.",
      effectiveness: 7
    }
  ]
};

export default function HookGeneratorStep({ onNext, onBack }: HookGeneratorStepProps) {
  const [hookType, setHookType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHooks, setGeneratedHooks] = useState<any>(null);
  const [selectedHook, setSelectedHook] = useState("");
  const [error, setError] = useState("");
  
  const handleGenerateHooks = () => {
    if (!hookType) {
      setError("Please select a hook type first");
      return;
    }
    
    // Clear any previous errors
    setError("");
    
    // Show loading state
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Get the mock data for the selected hook type
      const data = MOCK_DATA[hookType];
      
      if (data) {
        setGeneratedHooks({ hooks: data });
      } else {
        setError("Could not generate hooks for this type. Please try another type.");
      }
      
      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  };
  
  const handleSaveAndContinue = () => {
    // Save the selected hook (in a real app, this would dispatch to Redux)
    localStorage.setItem("selectedHook", selectedHook);
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
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Hook Ideas"}
        </button>
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