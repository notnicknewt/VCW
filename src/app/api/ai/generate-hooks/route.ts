import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { contentIdea, hookType, targetAudience } = await request.json();
    
    // Validate input
    if (!contentIdea || !hookType || !targetAudience) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Mock API response for testing
    const mockHooks = {
      hooks: [
        {
          hook: `Did you know that 87% of ${targetAudience} struggle with this exact problem?`,
          explanation: "This hook uses a statistical claim to create immediate interest and relatability.",
          effectiveness: 8
        },
        {
          hook: `I discovered a way to solve the biggest problem ${targetAudience} face daily...`,
          explanation: "This hook creates curiosity by promising a solution to a common pain point.",
          effectiveness: 9
        },
        {
          hook: `Stop doing THIS if you're a ${targetAudience.split(',')[0]} who wants better results!`,
          explanation: "This hook uses a pattern interrupt with a direct command that creates curiosity.",
          effectiveness: 7
        }
      ]
    };
    
    return NextResponse.json(mockHooks);
  } catch (error) {
    console.error("Error in generate-hooks API route:", error);
    return NextResponse.json(
      { error: "Failed to generate hooks" },
      { status: 500 }
    );
  }
}
