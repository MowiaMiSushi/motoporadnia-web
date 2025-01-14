'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory, faUser, faClock, faEdit } from '@fortawesome/free-solid-svg-icons';

interface Change {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  section: string;
  details: string;
}

export default function ChangeHistory() {
  const [changes, setChanges] = useState<Change[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChanges = async () => {
      try {
        const response = await fetch('/api/history');
        if (response.ok) {
          const data = await response.json();
          setChanges(data);
        } else {
          console.error('Failed to fetch change history:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching change history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChanges();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-500">Ładowanie historii zmian...</div>
      </div>
    );
  }

  if (changes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center text-gray-500">
          <FontAwesomeIcon icon={faHistory} className="text-4xl mb-4" />
          <p>Brak historii zmian</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FontAwesomeIcon icon={faHistory} />
          Historia zmian
        </h2>
      </div>
      <div className="divide-y">
        {changes.map((change) => (
          <div key={change.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="font-medium">{change.action}</div>
                <div className="text-sm text-gray-600">{change.details}</div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                    {change.user}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                    {new Date(change.timestamp).toLocaleString('pl-PL')}
                  </span>
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    {change.section}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 