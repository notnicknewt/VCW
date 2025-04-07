import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { contentIdea, targetAudience, contentGoal } = await request.json();
    
    // Validate input
    if (!contentIdea || !targetAudience || !contentGoal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Mock API response for testing
    const mockAnalysis = {
      score: Math.floor(Math.random() * 4) + 6, // Random score between 6-9
      strengths: [
        "Your idea is concise and focused on a specific audience",
        "The content has potential for high engagement",
        "The concept is timely and relevant"
      ],
      weaknesses: [
        "Could benefit from more emotional hooks",
        "May need more unique differentiators"
      ],
      improvements: [
        {
          suggestion: "Add a surprising statistic or fact at the beginning",
          reasoning: "This creates immediate curiosity and makes viewers want to learn more"
        },
        {
          suggestion: "Include a specific pain point for your target audience",
          reasoning: "This increases relatability and makes viewers feel understood"
        }
      ],
      analysis: "This content idea has good viral potential with some refinements."
    };
    
    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error("Error in analyze-idea API route:", error);
    return NextResponse.json(
      { error: "Failed to analyze content idea" },
      { status: 500 }
    );
  }
}
