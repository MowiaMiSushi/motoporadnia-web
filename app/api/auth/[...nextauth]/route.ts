import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth';

const handler = NextAuth(authOptions);

async function handleRequest(req: Request): Promise<Response> {
  try {
    const response = await handler(req);
    return response;
  } catch (error) {
    console.error('NextAuth Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}

export const GET = handleRequest;
export const POST = handleRequest; 