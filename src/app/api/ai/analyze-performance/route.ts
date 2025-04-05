import { NextRequest, NextResponse } from 'next/server';
import { analyzeContentPerformance } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { metrics, contentCategory, platform, timeFrame } = await request.json();

    // Validate input
    if (!metrics || !contentCategory || !platform || !timeFrame) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate metrics object has all required fields
    const requiredMetrics = ['views', 'likes', 'comments', 'shares', 'saves', 'watchTime', 'followersGained', 'profileVisits'];
    for (const field of requiredMetrics) {
      if (metrics[field] === undefined) {
        return NextResponse.json(
          { error: `Missing required metric: ${field}` },
          { status: 400 }
        );
      }
    }

    // Call OpenAI to analyze content performance
    const performanceAnalysis = await analyzeContentPerformance(
      metrics,
      contentCategory,
      platform,
      timeFrame
    );

    return NextResponse.json(performanceAnalysis);
  } catch (error) {
    console.error('Error in analyze-performance API route:', error);
    return NextResponse.json(
      { error: 'Failed to analyze content performance' },
      { status: 500 }
    );
  }
}
