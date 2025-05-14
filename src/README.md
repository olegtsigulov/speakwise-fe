# SpeakWise Frontend (Next.js)

This is the Next.js version of the SpeakWise frontend application.

## Key Features

- Modern React with Next.js framework
- TypeScript for type safety
- Client and Server components
- Authentication system with JWT
- Route protection and middleware
- Styled Components for styling
- React Hook Form with Zod validation
- Tanstack React Query for data fetching

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Project Structure

- `/app` - Next.js application pages and routes
  - `/(auth)` - Authentication-related pages (login, register)
  - `/dashboard` - Protected dashboard pages
  - `/api` - API routes
- `/components` - Reusable UI components
- `/features` - Feature-specific components and logic
- `/services` - API services and business logic
- `/lib` - Utility libraries
- `/styles` - Global styles and theme

## Testing

Run tests with:

```bash
npm run test
# or
yarn test
``` 