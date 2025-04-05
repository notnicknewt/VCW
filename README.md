# Viral Content Wizard

A comprehensive web application for creating viral short-form videos with AI-powered analysis and suggestions.

## Features

- **AI-Powered Content Analysis**: Get real-time feedback and suggestions for your content ideas
- **Hook Generator**: Create powerful hooks that grab viewer attention in the first few seconds
- **Content Structure Builder**: Build your video structure with visual timelines and templates
- **Pre-Post Checklist**: Ensure your content is fully optimized before posting
- **Caption & Hashtag Assistant**: Generate engaging captions and strategic hashtags
- **Performance Tracker**: Analyze your content performance and get actionable insights
- **Project Management**: Save and organize multiple content projects
- **User Authentication**: Secure login with email or Google authentication

## Tech Stack

- Next.js with TypeScript
- Tailwind CSS for styling
- Redux for state management
- Firebase for authentication and database
- OpenAI API for AI-powered content analysis

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/viral-content-wizard.git
cd viral-content-wizard
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key

# Next Auth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
