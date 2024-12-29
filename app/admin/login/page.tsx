'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;

      console.log('Próba logowania:', { username });

      const baseUrl = window.location.origin;
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
        callbackUrl: `${baseUrl}/admin/dashboard`
      });

      console.log('Wynik logowania:', result);

      if (!result) {
        throw new Error('Brak odpowiedzi z serwera');
      }

      if (result.error) {
        setError(result.error);
      } else if (result.ok) {
        // Poczekaj chwilę przed przekierowaniem
        setTimeout(() => {
          window.location.href = `${baseUrl}/admin/dashboard`;
        }, 500);
      }
    } catch (err) {
      console.error('Błąd logowania:', err);
      setError(err instanceof Error ? err.message : 'Wystąpił nieznany błąd');
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
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              name="username"
              type="text"
              placeholder="Login"
              required
              disabled={isLoading}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <input
              name="password"
              type="password"
              placeholder="Hasło"
              required
              disabled={isLoading}
              className="w-full p-2 border rounded"
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