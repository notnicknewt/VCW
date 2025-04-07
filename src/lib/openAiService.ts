import OpenAI from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    
    // Return mock data if API call fails
    return {
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
  }
}