import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { hook, middle, ending, contentType } = await request.json();
    
    // Validate input
    if (!hook || !middle || !ending || !contentType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Mock API response for testing
    const mockAnalysis = {
      score: Math.floor(Math.random() * 3) + 7, // Random score between 7-9
      pacing: "Good pacing with clear transitions between sections",
      transitions: "Natural flow between hook, middle, and ending",
      strengths: [
        "Strong hook that immediately grabs attention",
        "Clear and concise main content",
        "Effective call-to-action that prompts engagement"
      ],
      improvements: [
        "Consider making the middle section slightly shorter for better retention",
        "Add a pattern interrupt in the middle to re-engage viewers"
      ],
      analysis: "The structure is well-designed for short-form video. The hook effectively captures attention, the middle delivers value, and the ending has a clear call-to-action."
    };
    
    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error("Error in analyze-structure API route:", error);
    return NextResponse.json(
      { error: "Failed to analyze content structure" },
      { status: 500 }
    );
  }
}
