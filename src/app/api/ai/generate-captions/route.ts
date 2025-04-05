import { NextRequest, NextResponse } from 'next/server';
import { generateCaptionsAndHashtags } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { contentSummary, keyPoints, captionStyle, ctaType, contentNiche } = await request.json();

    // Validate input
    if (!contentSummary || !keyPoints || !captionStyle || !ctaType || !contentNiche) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call OpenAI to generate captions and hashtags
    const captionsResult = await generateCaptionsAndHashtags(
      contentSummary,
      keyPoints,
      captionStyle,
      ctaType,
      contentNiche
    );

    return NextResponse.json(captionsResult);
  } catch (error) {
    console.error('Error in generate-captions API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate captions and hashtags' },
      { status: 500 }
    );
  }
}
