'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
}

const initialUsers: User[] = [
  {
    id: '1',
    name: 'Administrator',
    email: 'admin@motoporadnia.pl',
    role: 'admin',
    lastLogin: '2024-02-20',
  },
  {
    id: '2',
    name: 'Moderator',
    email: 'mod@motoporadnia.pl',
    role: 'moderator',
    lastLogin: '2024-02-19',
  },
];

export default function AdminUsers() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    role: 'moderator',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      // Tutaj dodamy logikę zapisywania do bazy danych
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...editForm }
            : user
        )
      );
      setSelectedUser(null);
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      // Tutaj dodamy logikę usuwania z bazy danych
      setUsers(users.filter((user) => user.id !== userId));
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas usuwania:', error);
    }
  };

  const handleAddUser = async () => {
    if (newUserForm.password !== newUserForm.confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }

    try {
      // Tutaj dodamy logikę dodawania do bazy danych
      const newUser: User = {
        id: Date.now().toString(),
        name: newUserForm.name,
        email: newUserForm.email,
        role: newUserForm.role,
      };
      setUsers([...users, newUser]);
      setIsAddingUser(false);
      setNewUserForm({
        name: '',
        email: '',
        role: 'moderator',
        password: '',
        confirmPassword: '',
      });
      setError('');
      // Dodaj powiadomienie o sukcesie
    } catch (error) {
      console.error('Błąd podczas dodawania użytkownika:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Zarządzanie użytkownikami
            </h1>
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
            >
              ← Powrót do panelu
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <button
              onClick={() => setIsAddingUser(true)}
              className="inline-flex items-center px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Dodaj użytkownika
            </button>
          </div>

          {isAddingUser && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 bg-white rounded-lg shadow p-6"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Dodaj nowego użytkownika
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    value={newUserForm.name}
                    onChange={(e) =>
                      setNewUserForm({ ...newUserForm, name: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newUserForm.email}
                    onChange={(e) =>
                      setNewUserForm({ ...newUserForm, email: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Rola
                  </label>
                  <select
                    value={newUserForm.role}
                    onChange={(e) =>
                      setNewUserForm({ ...newUserForm, role: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                  >
                    <option value="moderator">Moderator</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hasło
                  </label>
                  <input
                    type="password"
                    value={newUserForm.password}
                    onChange={(e) =>
                      setNewUserForm({ ...newUserForm, password: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Potwierdź hasło
                  </label>
                  <input
                    type="password"
                    value={newUserForm.confirmPassword}
                    onChange={(e) =>
                      setNewUserForm({
                        ...newUserForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                  />
                </div>
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setIsAddingUser(false);
                      setError('');
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200"
                  >
                    Dodaj użytkownika
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {users.map((user) => (
                <motion.li
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="px-4 py-4 sm:px-6">
                    {selectedUser?.id === user.id ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Imię i nazwisko
                          </label>
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Email
                          </label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({ ...editForm, email: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Rola
                          </label>
                          <select
                            value={editForm.role}
                            onChange={(e) =>
                              setEditForm({ ...editForm, role: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C62400] focus:border-[#C62400]"
                          >
                            <option value="moderator">Moderator</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => setSelectedUser(null)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                          >
                            Anuluj
                          </button>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-[#C62400] text-white rounded-md hover:bg-[#A51D00] transition-colors duration-200"
                          >
                            Zapisz zmiany
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-[#C62400] truncate">
                              {user.name}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {user.role}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 flex justify-between">
                            <div>
                              <p className="flex items-center text-sm text-gray-500">
                                {user.email}
                              </p>
                              {user.lastLogin && (
                                <p className="mt-1 flex items-center text-sm text-gray-500">
                                  Ostatnie logowanie: {user.lastLogin}
                                </p>
                              )}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(user)}
                                className="text-[#C62400] hover:text-[#A51D00] transition-colors duration-200"
                              >
                                Edytuj
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="text-red-600 hover:text-red-800 transition-colors duration-200"
                              >
                                Usuń
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
} 