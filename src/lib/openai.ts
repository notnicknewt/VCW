import OpenAI from 'openai';

// Initialize the OpenAI client
// In production, you would use environment variables for the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to analyze content idea for viral potential
export async function analyzeContentIdea(
  contentIdea: string,
  targetAudience: string,
  contentGoal: string
) {
  const prompt = `
    As a viral content strategist, analyze this short-form video idea:
    
    Content Idea: ${contentIdea}
    Target Audience: ${targetAudience}
    Content Goal: ${contentGoal}
    
    Provide a detailed analysis including:
    1. Viral potential score (1-10)
    2. Strengths of this idea
    3. Weaknesses or challenges
    4. Specific improvement suggestions
    5. Why each suggestion would improve viral potential
    
    Format your response as JSON with the following structure:
    {
      "score": number,
      "strengths": string[],
      "weaknesses": string[],
      "improvements": { "suggestion": string, "reasoning": string }[],
      "analysis": string
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert viral content strategist who specializes in short-form video content for platforms like TikTok, Instagram Reels, and YouTube Shorts. You understand algorithm patterns, viewer psychology, and what makes content go viral."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Error analyzing content idea:', error);
    throw error;
  }
}

// Helper function to generate hooks based on content idea
export async function generateHooks(
  contentIdea: string,
  hookType: string,
  targetAudience: string
) {
  const prompt = `
    Generate 3 powerful hooks for a short-form video with this idea:
    
    Content Idea: ${contentIdea}
    Hook Type: ${hookType}
    Target Audience: ${targetAudience}
    
    For each hook, explain why it would be effective for this audience and content type.
    
    Format your response as JSON with the following structure:
    {
      "hooks": [
        {
          "hook": string,
          "explanation": string,
          "effectiveness": number
        }
      ]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert viral content strategist who specializes in creating powerful hooks for short-form videos. You understand what grabs attention in the first few seconds and how to prevent viewers from scrolling past."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Error generating hooks:', error);
    throw error;
  }
}

// Helper function to analyze content structure
export async function analyzeContentStructure(
  hook: string,
  middle: string,
  ending: string,
  contentType: string
) {
  const prompt = `
    Analyze this short-form video structure:
    
    Hook: ${hook}
    Middle/Value: ${middle}
    Ending/CTA: ${ending}
    Content Type: ${contentType}
    
    Provide feedback on:
    1. Structure effectiveness score (1-10)
    2. Pacing suggestions
    3. Transition improvements
    4. Specific strengths of this structure
    5. Areas for improvement
    
    Format your response as JSON with the following structure:
    {
      "score": number,
      "pacing": string,
      "transitions": string,
      "strengths": string[],
      "improvements": string[],
      "analysis": string
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert viral content strategist who specializes in optimizing content structure for short-form videos. You understand pacing, transitions, and how to maintain viewer attention throughout a video."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Error analyzing content structure:', error);
    throw error;
  }
}

// Helper function to generate captions and hashtags
export async function generateCaptionsAndHashtags(
  contentSummary: string,
  keyPoints: string[],
  captionStyle: string,
  ctaType: string,
  contentNiche: string
) {
  const prompt = `
    Generate 3 engaging captions and strategic hashtags for this content:
    
    Content Summary: ${contentSummary}
    Key Points: ${keyPoints.join(', ')}
    Caption Style: ${captionStyle}
    Call-to-Action Type: ${ctaType}
    Content Niche: ${contentNiche}
    
    For each caption, explain why it would be effective. Also provide hashtags in these categories:
    - High-reach hashtags (1M+ posts)
    - Niche-targeted hashtags (100K-1M posts)
    - Trending hashtags
    - Low-competition hashtags (under 100K posts)
    
    Format your response as JSON with the following structure:
    {
      "captions": [
        {
          "text": string,
          "explanation": string
        }
      ],
      "hashtags": {
        "highReach": string[],
        "nicheFocused": string[],
        "trending": string[],
        "lowCompetition": string[]
      },
      "engagementTips": string[]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert viral content strategist who specializes in creating engaging captions and strategic hashtags for short-form videos. You understand platform algorithms and how to maximize reach and engagement."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Error generating captions and hashtags:', error);
    throw error;
  }
}

// Helper function to analyze content performance
export async function analyzeContentPerformance(
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    watchTime: number;
    followersGained: number;
    profileVisits: number;
  },
  contentCategory: string,
  platform: string,
  timeFrame: string
) {
  const prompt = `
    Analyze these performance metrics for a short-form video:
    
    Views: ${metrics.views}
    Likes: ${metrics.likes}
    Comments: ${metrics.comments}
    Shares: ${metrics.shares}
    Saves: ${metrics.saves}
    Watch Time: ${metrics.watchTime}%
    New Followers: ${metrics.followersGained}
    Profile Visits: ${metrics.profileVisits}
    
    Content Category: ${contentCategory}
    Platform: ${platform}
    Time Since Posting: ${timeFrame}
    
    Provide analysis including:
    1. Overall performance rating (Above Expected, Average, Below Expected)
    2. Key metrics comparison to benchmarks
    3. Content strengths based on metrics
    4. Areas for improvement
    5. Actionable recommendations for future content
    6. Learning insights about what worked and why
    
    Format your response as JSON with the following structure:
    {
      "rating": string,
      "metrics": {
        "engagementRate": { "value": number, "comparison": string },
        "saveRate": { "value": number, "comparison": string },
        "watchTime": { "value": number, "comparison": string },
        "commentRate": { "value": number, "comparison": string }
      },
      "strengths": [{ "title": string, "explanation": string }],
      "weaknesses": [{ "title": string, "explanation": string }],
      "actionPlan": string[],
      "insights": [{ "title": string, "content": string }]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert viral content strategist who specializes in analyzing performance metrics for short-form videos. You understand platform benchmarks, algorithm patterns, and how to interpret metrics to improve future content."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    });

    // Parse the JSON response
    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error('Error analyzing content performance:', error);
    throw error;
  }
}
