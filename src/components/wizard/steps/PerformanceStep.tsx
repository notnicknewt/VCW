import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePerformance, setLoading, setError } from "@/store/projectsSlice";
import WizardTooltip from "../WizardTooltip";

interface PerformanceStepProps {
  onBack: () => void;
}

const CONTENT_CATEGORIES = [
  { value: "educational", label: "Educational" },
  { value: "entertainment", label: "Entertainment" },
  { value: "tutorial", label: "Tutorial/How-To" },
  { value: "vlog", label: "Vlog/Personal" },
  { value: "product", label: "Product/Service" },
];

const PLATFORMS = [
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram Reels" },
  { value: "youtube", label: "YouTube Shorts" },
  { value: "facebook", label: "Facebook Reels" },
];

const TIME_FRAMES = [
  { value: "24hours", label: "24 Hours" },
  { value: "48hours", label: "48 Hours" },
  { value: "1week", label: "1 Week" },
  { value: "2weeks", label: "2 Weeks" },
  { value: "1month", label: "1 Month" },
];

export default function PerformanceStep({ onBack }: PerformanceStepProps) {
  const dispatch = useDispatch();
  const { currentProject, loading } = useSelector((state: any) => state.projects);

  // Metrics state
  const [metrics, setMetrics] = useState({
    views: currentProject?.performance?.metrics?.views || 0,
    likes: currentProject?.performance?.metrics?.likes || 0,
    comments: currentProject?.performance?.metrics?.comments || 0,
    shares: currentProject?.performance?.metrics?.shares || 0,
    saves: currentProject?.performance?.metrics?.saves || 0,
    watchTime: currentProject?.performance?.metrics?.watchTime || 0,
    followersGained: currentProject?.performance?.metrics?.followersGained || 0,
    profileVisits: currentProject?.performance?.metrics?.profileVisits || 0,
  });

  // Additional state
  const [contentCategory, setContentCategory] = useState(
    currentProject?.performance?.contentCategory || ""
  );
  const [platform, setPlatform] = useState(currentProject?.performance?.platform || "");
  const [timeFrame, setTimeFrame] = useState(currentProject?.performance?.timeFrame || "");
  const [analysis, setAnalysis] = useState(currentProject?.performance?.analysis || null);

  const handleMetricChange = (metric: string, value: string) => {
    setMetrics({
      ...metrics,
      [metric]: Number(value),
    });
  };

  const handleAnalyzePerformance = async () => {
    if (!contentCategory || !platform || !timeFrame) return;

    dispatch(setLoading(true));

    try {
      const response = await fetch("/api/ai/analyze-performance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metrics,
          contentCategory,
          platform,
          timeFrame,
        }),
      });

      const data = await response.json();
      setAnalysis(data);

      // Save to Redux
      dispatch(
        savePerformance({
          metrics,
          contentCategory,
          platform,
          timeFrame,
          analysis: data,
        })
      );
    } catch (error) {
      dispatch(setError("Failed to analyze performance"));
      console.error("Error analyzing performance:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Helper function to determine CSS class based on comparison text
  const getComparisonClass = (comparison: string): string => {
    if (comparison.includes("above") || comparison.includes("higher") || comparison.includes("better")) {
      return "text-green-600";
    } else if (comparison.includes("below") || comparison.includes("lower") || comparison.includes("worse")) {
      return "text-red-600";
    } else {
      return "text-amber-600";
    }
  };

  return (
    <div className="performance-step">
      <h2 className="step-title text-2xl font-bold mb-6 flex items-center">
        Performance Analysis
        <WizardTooltip
          title="Why Track Performance"
          content="Analyzing your content performance helps you understand what works and improve future videos. This creates a learning feedback loop."
        />
      </h2>

      <div className="input-section mb-8">
        <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Views
              <WizardTooltip
                title="Views"
                content="Total number of times your video was viewed. This is the base metric for reach."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.views}
              onChange={(e) => handleMetricChange("views", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Likes
              <WizardTooltip
                title="Likes"
                content="Number of likes your video received. This signals positive engagement."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.likes}
              onChange={(e) => handleMetricChange("likes", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Comments
              <WizardTooltip
                title="Comments"
                content="Number of comments received. Comments indicate deeper engagement and boost algorithmic performance."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.comments}
              onChange={(e) => handleMetricChange("comments", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Shares
              <WizardTooltip
                title="Shares"
                content="Number of times your video was shared. Shares dramatically expand your reach beyond your followers."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.shares}
              onChange={(e) => handleMetricChange("shares", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Saves
              <WizardTooltip
                title="Saves"
                content="Number of times your video was saved. Saves indicate high-value content worth revisiting."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.saves}
              onChange={(e) => handleMetricChange("saves", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Watch Time (%)
              <WizardTooltip
                title="Watch Time"
                content="Average percentage of the video that was watched. Higher watch time is highly rewarded by algorithms."
              />
            </label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.watchTime}
              onChange={(e) => handleMetricChange("watchTime", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              New Followers
              <WizardTooltip
                title="New Followers"
                content="Number of new followers gained from this video. Indicates your content converted viewers to followers."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.followersGained}
              onChange={(e) => handleMetricChange("followersGained", e.target.value)}
            />
          </div>

          <div className="metric-input p-4 bg-white rounded-lg border border-gray-200">
            <label className="block mb-2 font-medium">
              Profile Visits
              <WizardTooltip
                title="Profile Visits"
                content="Number of times viewers visited your profile from this video. Indicates curiosity about your other content."
              />
            </label>
            <input
              type="number"
              min="0"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={metrics.profileVisits}
              onChange={(e) => handleMetricChange("profileVisits", e.target.value)}
            />
          </div>
        </div>

        <div className="additional-info space-y-6">
          <div className="option-group">
            <label className="block mb-2 font-medium">Content Category</label>
            <div className="option-buttons flex flex-wrap gap-2">
              {CONTENT_CATEGORIES.map((category) => (
                <button
                  key={category.value}
                  type="button"
                  className={`px-4 py-2 border rounded-md transition ${
                    contentCategory === category.value
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setContentCategory(category.value)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label className="block mb-2 font-medium">Platform</label>
            <div className="option-buttons flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`px-4 py-2 border rounded-md transition ${
                    platform === p.value
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setPlatform(p.value)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="option-group">
            <label className="block mb-2 font-medium">Time Since Posting</label>
            <div className="option-buttons flex flex-wrap gap-2">
              {TIME_FRAMES.map((time) => (
                <button
                  key={time.value}
                  type="button"
                  className={`px-4 py-2 border rounded-md transition ${
                    timeFrame === time.value
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-gray-300 hover:border-purple-300"
                  }`}
                  onClick={() => setTimeFrame(time.value)}
                >
                  {time.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        className="analyze-button w-full p-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-8"
        onClick={handleAnalyzePerformance}
        disabled={loading || !contentCategory || !platform || !timeFrame}
      >
        {loading ? "Analyzing..." : "Analyze Performance"}
      </button>

      {analysis && (
        <div className="analysis-results p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-6">Performance Analysis</h3>

          <div className="performance-overview grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="rating-box col-span-1 p-4 bg-white rounded-lg border border-gray-200 flex flex-col items-center justify-center">
              <div className="rating-label text-sm text-gray-600 mb-1">Overall Rating</div>
              <div className={`rating-value text-xl font-bold ${
                analysis.rating.toLowerCase().includes("above") ? "text-green-600" :
                analysis.rating.toLowerCase().includes("below") ? "text-red-600" : "text-amber-600"
              }`}>
                {analysis.rating}
              </div>
            </div>

            <div className="metrics-comparison col-span-4 p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium mb-3">Metrics Comparison</h4>
              <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="metric-comparison p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="metric-name text-sm text-gray-600">Engagement Rate</div>
                  <div className="metric-value text-lg font-bold">{analysis.metrics.engagementRate.value}%</div>
                  <div className={`metric-comparison-label text-sm ${getComparisonClass(analysis.metrics.engagementRate.comparison)}`}>
                    {analysis.metrics.engagementRate.comparison}
                  </div>
                </div>

                <div className="metric-comparison p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="metric-name text-sm text-gray-600">Save Rate</div>
                  <div className="metric-value text-lg font-bold">{analysis.metrics.saveRate.value}%</div>
                  <div className={`metric-comparison-label text-sm ${getComparisonClass(analysis.metrics.saveRate.comparison)}`}>
                    {analysis.metrics.saveRate.comparison}
                  </div>
                </div>

                <div className="metric-comparison p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="metric-name text-sm text-gray-600">Watch Time</div>
                  <div className="metric-value text-lg font-bold">{analysis.metrics.watchTime.value}%</div>
                  <div className={`metric-comparison-label text-sm ${getComparisonClass(analysis.metrics.watchTime.comparison)}`}>
                    {analysis.metrics.watchTime.comparison}
                  </div>
                </div>

                <div className="metric-comparison p-3 bg-gray-50 rounded border border-gray-200">
                  <div className="metric-name text-sm text-gray-600">Comment Rate</div>
                  <div className="metric-value text-lg font-bold">{analysis.metrics.commentRate.value}%</div>
                  <div className={`metric-comparison-label text-sm ${getComparisonClass(analysis.metrics.commentRate.comparison)}`}>
                    {analysis.metrics.commentRate.comparison}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="strengths-weaknesses grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="strengths-section p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-bold text-green-600 mb-3">Content Strengths</h4>
              <div className="strengths-list space-y-3">
                {analysis.strengths.map((strength: any, i: number) => (
                  <div key={i} className="strength-item p-3 bg-green-50 rounded border border-green-100">
                    <div className="strength-title font-medium mb-1">{strength.title}</div>
                    <div className="strength-explanation text-sm text-gray-600">{strength.explanation}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="weaknesses-section p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-bold text-red-600 mb-3">Areas for Improvement</h4>
              <div className="weaknesses-list space-y-3">
                {analysis.weaknesses.map((weakness: any, i: number) => (
                  <div key={i} className="weakness-item p-3 bg-red-50 rounded border border-red-100">
                    <div className="weakness-title font-medium mb-1">{weakness.title}</div>
                    <div className="weakness-explanation text-sm text-gray-600">{weakness.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="action-plan p-4 bg-white rounded-lg border border-gray-200 mb-8">
            <h4 className="font-bold mb-3">Action Plan for Future Content</h4>
            <ul className="list-disc pl-5 space-y-2">
              {analysis.actionPlan.map((action: string, i: number) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </div>

          <div className="insights p-4 bg-white rounded-lg border border-gray-200 mb-8">
            <h4 className="font-bold mb-3">Learning Insights</h4>
            <div className="insights-list grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.insights.map((insight: any, i: number) => (
                <div key={i} className="insight-card p-3 bg-purple-50 rounded border border-purple-100">
                  <div className="insight-title font-medium mb-1 text-purple-700">{insight.title}</div>
                  <div className="insight-content text-sm">{insight.content}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="wizard-navigation flex justify-between mt-6">
            <button 
              className="back-button px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition" 
              onClick={onBack}
            >
              Back to Captions & Hashtags
            </button>
            <button 
              className="complete-button px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => window.location.href = "/dashboard"}
            >
              Complete & Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
