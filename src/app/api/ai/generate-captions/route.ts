import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { contentSummary, keyPoints, captionStyle, ctaType, contentNiche } = await request.json();
    
    // Validate input
    if (!contentSummary || !keyPoints || !captionStyle || !ctaType || !contentNiche) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Mock API response for testing
    const mockCaptions = {
      captions: [
        {
          text: `✨ ${contentSummary}\n\n${keyPoints[0]}\n${keyPoints.length > 1 ? keyPoints[1] : ''}\n\n👇 ${ctaType === 'comment' ? 'Comment your thoughts below!' : ctaType === 'follow' ? 'Follow for more tips!' : 'Save this for later!'}`,
          explanation: "This caption is concise, uses emojis effectively, and has a clear call-to-action."
        },
        {
          text: `I discovered something game-changing about ${contentNiche}...\n\n${keyPoints.join('\n')}\n\n${ctaType === 'share' ? 'Share with someone who needs to see this!' : ctaType === 'link' ? 'Link in bio for more!' : 'Save this to reference later!'}`,
          explanation: "This caption creates curiosity with an intriguing opening and clearly lists all key points."
        },
        {
          text: `The ${contentNiche} hack nobody is talking about 🤫\n\n${keyPoints.join('\n\n')}\n\nAgree or disagree? ${ctaType === 'comment' ? 'Drop your thoughts 👇' : ctaType === 'follow' ? 'Follow for more secret tips ✨' : 'Tag a friend who needs to see this 👀'}`,
          explanation: "This caption uses exclusivity to create interest and ends with an engaging question."
        }
      ],
      hashtags: {
        highReach: [`#${contentNiche}`, `#${contentNiche}Tips`, `#${contentNiche}Hack`, `#Viral`, `#ForYou`, `#FYP`],
        nicheFocused: [`#${contentNiche}Advice`, `#${contentNiche}Creator`, `#${contentNiche}Community`, `#${contentNiche}Growth`],
        trending: [`#${contentNiche}2024`, `#Trending${contentNiche}`, `#${contentNiche}Challenge`],
        lowCompetition: [`#${contentNiche}Secrets`, `#${contentNiche}ForBeginners`, `#Daily${contentNiche}`, `#${contentNiche}LifeHack`]
      },
      engagementTips: [
        "Respond to comments within the first hour for maximum algorithm boost",
        "Pin your best comment to encourage more engagement",
        "Ask a question in your first comment to start a conversation",
        "Post when your audience is most active (check your analytics)"
      ]
    };
    
    return NextResponse.json(mockCaptions);
  } catch (error) {
    console.error("Error in generate-captions API route:", error);
    return NextResponse.json(
      { error: "Failed to generate captions" },
      { status: 500 }
    );
  }
}
