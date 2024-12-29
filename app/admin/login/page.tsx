'use client';

import { signIn, useSession } from 'next-auth/react';
import { FormEvent, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session) {
      router.replace('/admin/dashboard');
    }
  }, [session, router]);

  // Jeśli trwa ładowanie sesji, pokaż loader
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#C62400] border-gray-200 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Jeśli użytkownik jest zalogowany, nie pokazuj formularza
  if (session) {
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: '/admin/dashboard'
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.replace('/admin/dashboard');
      }
    } catch (err) {
      setError('Wystąpił błąd podczas logowania');
      console.error('Błąd logowania:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Panel administracyjny</h2>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Login
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              disabled={isLoading}
              className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Hasło
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              className="mt-1 w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logowanie...' : 'Zaloguj się'}
          </button>
        </form>
      </div>
    </div>
  );
} 