import { NextRequest, NextResponse } from 'next/server';
import { generateHooks } from '@/lib/openAiService';

export async function POST(request: NextRequest) {
  try {
    const { contentIdea, hookType, targetAudience } = await request.json();

    // Validate input
    if (!contentIdea || !hookType || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call OpenAI to generate hooks
    const result = await generateHooks(
      contentIdea,
      hookType,
      targetAudience
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in generate-hooks API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate hooks' },
      { status: 500 }
    );
  }
}