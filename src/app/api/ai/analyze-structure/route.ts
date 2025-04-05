import { NextRequest, NextResponse } from 'next/server';
import { analyzeContentStructure } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { hook, middle, ending, contentType } = await request.json();

    // Validate input
    if (!hook || !middle || !ending || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Call OpenAI to analyze content structure
    const structureAnalysis = await analyzeContentStructure(
      hook,
      middle,
      ending,
      contentType
    );

    return NextResponse.json(structureAnalysis);
  } catch (error) {
    console.error('Error in analyze-structure API route:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content structure' },
      { status: 500 }
    );
  }
}
