import { NextRequest, NextResponse } from 'next/server';

// Mock data for testing
const MOCK_HOOKS = {
  hooks: [
    {
      hook: "Did you know 80% of people are doing this wrong? Here's what the pros don't want you to know...",
      explanation: "This hook creates immediate curiosity by suggesting insider knowledge and plays on the fear of missing out or doing something incorrectly.",
      effectiveness: 9
    },
    {
      hook: "I tried every trending method for 30 days. Only this one actually worked...",
      explanation: "This hook leverages personal experience and the promise of a solution that's been tested, creating authority and trust.",
      effectiveness: 8
    },
    {
      hook: "This 10-second trick changed everything for me (and it will for you too)...",
      explanation: "This hook promises a quick, easy solution with guaranteed results, appealing to the audience's desire for simple fixes.",
      effectiveness: 7
    }
  ]
};

export async function POST(request: NextRequest) {
  try {
    // For debugging, log that the API was called
    console.log('API route called: /api/hooks');
    
    const { contentIdea, hookType, targetAudience } = await request.json();
    console.log('Request data:', { contentIdea, hookType, targetAudience });

    // Validate input
    if (!contentIdea || !hookType || !targetAudience) {
      console.log('Missing required fields:', { contentIdea, hookType, targetAudience });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // For now, return mock data instead of calling OpenAI
    // This ensures the feature works without API key issues
    return NextResponse.json(MOCK_HOOKS);
    
  } catch (error) {
    console.error('Error in hooks API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate hooks' },
      { status: 500 }
    );
  }
}