// app/auth/page.js
import { cookies } from 'next/headers';  // To handle cookies if needed
import Auth from './auth';  // The client-side component

// Server-side function to fetch query parameters
export default async function AuthPage({ searchParams }) {
  // Extract query parameters directly from the searchParams
  const { code, context } = searchParams;

  console.log('Fetched Query Params on Server:', { code, context });

  // Pass the query parameters to the client-side Auth component
  return (
    <div>
      <h1>Authenticating...</h1>
      <Auth query={{ code, context }} />
    </div>
  );
}
