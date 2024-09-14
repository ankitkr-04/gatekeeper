# MUSEOBOT

*MUSEOBOT* is a Next.js-based museum ticketing system that integrates with Clerk for authentication, Razorpay for payment processing, and Botpress for chatbot interaction.

## Table of Contents
- Features
- Environment Variables
- Setup
- Usage
- Tech Stack
- Getting Started
- Learn More
- Deploy on Vercel

## Features
- **User Authentication**: Powered by Clerk (Sign-up, Sign-in)
- **Payment Integration**: Razorpay for secure payments
- **Chatbot Integration**: Botpress for conversational UI
- **Ticket Scanning**: Barcode scanner to validate tickets in real-time
- **Admin Panel**: Manage bookings, validate tickets, and monitor museum data

## Environment Variables
Ensure the following environment variables are configured in your `.env` file:

```env
DATABASE_URL=*****
NODE_ENV=*****
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=*****
CLERK_SECRET_KEY=*****
NEXT_PUBLIC_CLERK_SIGN_IN_URL=*****
NEXT_PUBLIC_CLERK_SIGN_UP_URL=*****
RAZORPAY_KEY_ID=*****
RAZORPAY_KEY_SECRET=*****
RAZORPAY_CALLBACK_URL=*****
BOTPRESS_CLIENT_ID=*****
BASE_URL=*****
BOTPRESS_WEBHOOK=*****

```
# Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file in the root directory and add the required environment variables
4. Run the development server with `npm run dev`

Usage
To start using Gatekeeper, navigate to your local development environment and ensure all environment variables are correctly set.
Tech Stack
- **Next.js 14**: Framework
- **Clerk**: User authentication
- **Razorpay**: Payment gateway
- **Botpress**: Conversational AI
- **PostgreSQL**: Database

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
