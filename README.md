
# NetworkPro 



[![Run on Vercel](https://img.shields.io/badge/Run%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://career-pro-v2.vercel.app/)

[![Run on Replit](https://replit.com/badge/github/replit/NetworkPro)](https://replit.com) 



A career and networking app that analyzes LinkedIn profile data to provide personalized AI-powered recommendations for career growth, networking, and skill development.

## 🌟 Features

- **Profile Analysis**: Upload your LinkedIn profile PDF for instant career insights
- **Smart Recommendations**: 
  - Top professionals to follow and connect with
  - Personalized job matches
  - Tailored learning resources
  - Strategic skill development suggestions
- **Career Interest Mapping**: AI-driven career path suggestions
- **Interactive Dashboard**: Track your professional growth
- **Dark/Light Mode**: Comfortable viewing experience

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Radix UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **PDF Processing**: PDF parsing for LinkedIn profile analysis
- **State Management**: React Query
- **UI Components**: Shadcn/ui

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Visit http://0.0.0.0:5000 in your browser

## 📱 Application Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express server
└── shared/          # Shared types and schemas
```

## 🔒 Environment Setup

The application uses environment variables for configuration. Create a `.env` file with:

```env
DATABASE_URL=your_database_url
SESSION_SECRET=your_session_secret
```

## 📄 License

MIT License - feel free to use and modify for your purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
