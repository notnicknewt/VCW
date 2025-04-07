import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { metrics, contentCategory, platform, timeFrame } = await request.json();
    
    // Validate input
    if (!metrics || !contentCategory || !platform || !timeFrame) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Extract metrics
    const { views, likes, comments, shares, saves, watchTime } = metrics;
    
    // Calculate rates for comparison
    const engagementRate = Math.round((likes + comments + shares) / views * 100);
    const saveRate = Math.round(saves / views * 100);
    const commentRate = Math.round(comments / views * 100);
    
    // Generate comparison texts based on platform benchmarks
    const getComparison = (rate: number, benchmark: number) => {
      if (rate >= benchmark * 1.5) return "Significantly above average";
      if (rate >= benchmark) return "Above average";
      if (rate >= benchmark * 0.8) return "Average";
      return "Below average";
    };
    
    // Mock API response for testing
    const mockAnalysis = {
      rating: engagementRate > 5 ? "Above Expected" : engagementRate > 3 ? "Average" : "Below Expected",
      metrics: {
        engagementRate: {
          value: engagementRate,
          comparison: getComparison(engagementRate, 5)
        },
        saveRate: {
          value: saveRate,
          comparison: getComparison(saveRate, 3)
        },
        watchTime: {
          value: watchTime,
          comparison: getComparison(watchTime, 60)
        },
        commentRate: {
          value: commentRate,
          comparison: getComparison(commentRate, 2)
        }
      },
      strengths: [
        {
          title: watchTime > 70 ? "Exceptional Watch Time" : "Good Watch Time",
          explanation: "Your content is holding viewer attention, which is highly valued by the algorithm."
        },
        {
          title: saveRate > 2 ? "Strong Save Rate" : "Decent Save Rate",
          explanation: "Saves indicate your content is valuable enough for viewers to want to reference later."
        }
      ],
      weaknesses: [
        {
          title: commentRate < 1 ? "Low Comment Engagement" : "Average Comment Engagement",
          explanation: "Increasing comment engagement would help boost algorithmic distribution."
        },
        {
          title: "Potential for Higher Shares",
          explanation: "Increasing share rate would expand your reach to new audiences."
        }
      ],
      actionPlan: [
        "Add a direct question in your hook to encourage more comments",
        "Test a controversial or surprising statement to increase shares",
        "Optimize your first 3 seconds to improve watch time further",
        "Create more content in your highest-performing content category"
      ],
      insights: [
        {
          title: "Algorithm Insight",
          content: `${platform} prioritizes watch time and saves in its algorithm. Your content is performing well in these areas.`
        },
        {
          title: "Audience Behavior",
          content: "Your audience engages more with your content than the average for your niche, indicating strong audience alignment."
        }
      ]
    };
    
    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error("Error in analyze-performance API route:", error);
    return NextResponse.json(
      { error: "Failed to analyze performance" },
      { status: 500 }
    );
  }
}
