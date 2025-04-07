import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCaption, setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";

interface CaptionsStepProps {
  onNext: () => void;
  onBack: () => void;
}

const CAPTION_STYLES = [
  { value: "conversational", label: "Conversational" },
  { value: "professional", label: "Professional" },
  { value: "humorous", label: "Humorous" },
  { value: "inspirational", label: "Inspirational" },
  { value: "educational", label: "Educational" },
];

const CTA_TYPES = [
  { value: "follow", label: "Follow Account" },
  { value: "comment", label: "Leave a Comment" },
  { value: "save", label: "Save for Later" },
  { value: "share", label: "Share with Others" },
  { value: "link", label: "Click Link in Bio" },
];

export default function CaptionsStep({ onNext, onBack }: CaptionsStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);

  const [contentSummary, setContentSummary] = useState(currentProject?.caption?.contentSummary || "");
  const [keyPoints, setKeyPoints] = useState(currentProject?.caption?.keyPoints || ["", "", ""]);
  const [captionStyle, setCaptionStyle] = useState(currentProject?.caption?.captionStyle || "");
  const [ctaType, setCtaType] = useState(currentProject?.caption?.ctaType || "");
  const [contentNiche, setContentNiche] = useState(currentProject?.caption?.contentNiche || "");
  const [generatedCaptions, setGeneratedCaptions] = useState(
    currentProject?.caption?.generatedCaptions || null
  );
  const [selectedCaption, setSelectedCaption] = useState(currentProject?.caption?.selectedCaption || "");
  const [selectedHashtags, setSelectedHashtags] = useState<string[]>(
    currentProject?.caption?.selectedHashtags || []
  );

  const handleKeyPointChange = (index: number, value: string) => {
    const newKeyPoints = [...keyPoints];
    newKeyPoints[index] = value;
    setKeyPoints(newKeyPoints);
  };

  const handleAddKeyPoint = () => {
    setKeyPoints([...keyPoints, ""]);
  };

  const handleRemoveKeyPoint = (index: number) => {
    if (keyPoints.length <= 1) return;
    const newKeyPoints = keyPoints.filter((_, i) => i !== index);
    setKeyPoints(newKeyPoints);
  };

  const handleGenerateCaptions = async () => {
    if (!contentSummary || !captionStyle || !ctaType || !contentNiche) return;
    const filteredKeyPoints = keyPoints.filter((p) => p.trim() !== "");
    if (filteredKeyPoints.length === 0) return;

    dispatch(setLoading(true));

    try {
      const response = await fetch("/api/ai/generate-captions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentSummary,
          keyPoints: filteredKeyPoints,
          captionStyle,
          ctaType,
          contentNiche,
        }),
      });

      const data = await response.json();
      setGeneratedCaptions(data);
    } catch (error) {
      dispatch(setError("Failed to generate captions"));
      console.error("Error generating captions:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSelectCaption = (caption: string) => {
    setSelectedCaption(caption);
  };

  const handleToggleHashtag = (hashtag: string) => {
    if (selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(selectedHashtags.filter((h) => h !== hashtag));
    } else {
      setSelectedHashtags([...selectedHashtags, hashtag]);
    }
  };

  const handleSaveAndContinue = () => {
    if (!selectedCaption) return;

    dispatch(
      saveCaption({
        contentSummary,
        keyPoints,
        captionStyle,
        ctaType,
        contentNiche,
        selectedCaption,
        selectedHashtags,
        generatedCaptions,
      })
    );

    onNext();
  };

  return (
    <div className="captions-step">
      <h2 className="step-title text-2xl font-bold mb-6 flex items-center">
        Captions & Hashtags
        <WizardTooltip
          title="Why Captions Matter"
          content="Strong captions can increase engagement by 30%. They help viewers understand your content even with sound off."
        />
      </h2>

      <div className="inputs-section space-y-6">
        <div className="input-group">
          <label className="block mb-2 font-medium">
            Content Summary
            <WizardTooltip
              title="Content Summary Tips"
              content="A brief summary of what your video is about. This helps generate relevant captions and hashtags."
            />
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            value={contentSummary}
            onChange={(e) => setContentSummary(e.target.value)}
            placeholder="Briefly summarize what your video is about"
            rows={2}
          />
        </div>

        <div className="input-group">
          <label className="block mb-2 font-medium">
            Key Points
            <WizardTooltip
              title="Key Points"
              content="The main points or messages you want to convey in your video. Each key point will be reflected in your caption."
            />
          </label>
          <div className="key-points-list space-y-2">
            {keyPoints.map((point, index) => (
              <div key={index} className="key-point-item flex gap-2">
                <input
                  type="text"
                  className="flex-1 p-2 border border-gray-300 rounded-md"
                  value={point}
                  onChange={(e) => handleKeyPointChange(index, e.target.value)}
                  placeholder={`Key point ${index + 1}`}
                />
                <button
                  type="button"
                  className="remove-button w-8 h-8 flex items-center justify-center text-red-500 rounded-md border border-gray-300"
                  onClick={() => handleRemoveKeyPoint(index)}
                  disabled={keyPoints.length <= 1}
                >
                  &times;
                </button>
              </div>
            ))}
            <button 
              type="button" 
              className="add-key-point mt-2 text-purple-600 font-medium flex items-center"
              onClick={handleAddKeyPoint}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Key Point
            </button>
          </div>
        </div>

        <div className="options-row grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="option-group">
            <label className="block mb-2 font-medium">Caption Style</label>
            <div className="option-buttons flex flex-wrap gap-2">
              {CAPTION_STYLES.map((style) => (
                <button
                  key={style.value}
                  type="button"
                  className={`px-4 py-2 border rounded-md transition ${
                    captionStyle === style.value
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setCaptionStyle(style.value)}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label className="block mb-2 font-medium">Call-to-Action Type</label>
            <div className="option-buttons flex flex-wrap gap-2">
              {CTA_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`px-4 py-2 border rounded-md transition ${
                    ctaType === type.value
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setCtaType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="block mb-2 font-medium">
            Content Niche
            <WizardTooltip
              title="Content Niche"
              content="The specific category or niche your content belongs to. This helps generate relevant hashtags."
            />
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={contentNiche}
            onChange={(e) => setContentNiche(e.target.value)}
            placeholder="e.g., Fitness, Fashion, Tech, Food, Travel"
          />
        </div>
      </div>

      <button
        className="generate-button w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed my-8"
        onClick={handleGenerateCaptions}
        disabled={
          loading ||
          !contentSummary ||
          !captionStyle ||
          !ctaType ||
          !contentNiche ||
          keyPoints.filter((p) => p.trim() !== "").length === 0
        }
      >
        {loading ? "Generating..." : "Generate Captions & Hashtags"}
      </button>

      {generatedCaptions && (
        <div className="generated-content p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="captions-section mb-8">
            <h3 className="text-xl font-bold mb-4">Select a Caption</h3>
            <div className="captions-list space-y-4">
              {generatedCaptions.captions.map((caption: any, i: number) => (
                <div
                  key={i}
                  className={`caption-card p-4 border rounded-lg cursor-pointer transition ${
                    selectedCaption === caption.text
                      ? "border-purple-600 bg-white"
                      : "border-gray-200 hover:border-purple-300 bg-white"
                  }`}
                  onClick={() => handleSelectCaption(caption.text)}
                >
                  <div className="caption-text text-lg mb-3 p-3 bg-gray-50 rounded border border-gray-200">
                    {caption.text}
                  </div>
                  <div className="caption-explanation">
                    <h4 className="font-medium mb-1">Why This Works</h4>
                    <p className="text-sm text-gray-600">{caption.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hashtags-section mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              Recommended Hashtags
              <WizardTooltip
                title="Hashtag Strategy"
                content="Mix high-reach hashtags for visibility with niche hashtags for targeted audiences. Select 15-30 hashtags for optimal reach."
              />
            </h3>

            <div className="hashtags-categories grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="hashtag-category p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-blue-600">High Reach</h4>
                <div className="hashtags-list flex flex-wrap gap-2">
                  {generatedCaptions.hashtags.highReach.map((hashtag: string, i: number) => (
                    <div
                      key={i}
                      className={`hashtag px-2 py-1 rounded-md text-sm cursor-pointer transition ${
                        selectedHashtags.includes(hashtag)
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }`}
                      onClick={() => handleToggleHashtag(hashtag)}
                    >
                      {hashtag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hashtag-category p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-purple-600">Niche Focused</h4>
                <div className="hashtags-list flex flex-wrap gap-2">
                  {generatedCaptions.hashtags.nicheFocused.map((hashtag: string, i: number) => (
                    <div
                      key={i}
                      className={`hashtag px-2 py-1 rounded-md text-sm cursor-pointer transition ${
                        selectedHashtags.includes(hashtag)
                          ? "bg-purple-600 text-white"
                          : "bg-purple-50 text-purple-700 hover:bg-purple-100"
                      }`}
                      onClick={() => handleToggleHashtag(hashtag)}
                    >
                      {hashtag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hashtag-category p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-green-600">Trending</h4>
                <div className="hashtags-list flex flex-wrap gap-2">
                  {generatedCaptions.hashtags.trending.map((hashtag: string, i: number) => (
                    <div
                      key={i}
                      className={`hashtag px-2 py-1 rounded-md text-sm cursor-pointer transition ${
                        selectedHashtags.includes(hashtag)
                          ? "bg-green-600 text-white"
                          : "bg-green-50 text-green-700 hover:bg-green-100"
                      }`}
                      onClick={() => handleToggleHashtag(hashtag)}
                    >
                      {hashtag}
                    </div>
                  ))}
                </div>
              </div>

              <div className="hashtag-category p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2 text-amber-600">Low Competition</h4>
                <div className="hashtags-list flex flex-wrap gap-2">
                  {generatedCaptions.hashtags.lowCompetition.map((hashtag: string, i: number) => (
                    <div
                      key={i}
                      className={`hashtag px-2 py-1 rounded-md text-sm cursor-pointer transition ${
                        selectedHashtags.includes(hashtag)
                          ? "bg-amber-600 text-white"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                      onClick={() => handleToggleHashtag(hashtag)}
                    >
                      {hashtag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="engagement-tips mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium mb-2">Engagement Tips</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                {generatedCaptions.engagementTips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="wizard-navigation flex justify-between mt-6">
            <button className="back-button px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition" onClick={onBack}>
              Back to Content Structure
            </button>
            <button
              className="next-button px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSaveAndContinue}
              disabled={!selectedCaption}
            >
              Continue to Performance Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
