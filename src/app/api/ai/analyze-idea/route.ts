import { NextRequest, NextResponse } from 'next/server';
import { analyzeContentIdea } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { contentIdea, targetAudience, contentGoal } = await request.json();

    // Validate input
    if (!contentIdea || !targetAudience || !contentGoal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call OpenAI to analyze the content idea
    const analysis = await analyzeContentIdea(
      contentIdea,
      targetAudience,
      contentGoal
    );

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error in analyze-idea API route:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content idea' },
      { status: 500 }
    );
  }
}
