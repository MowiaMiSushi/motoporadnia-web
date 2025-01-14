'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfo, faExclamationTriangle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NotificationProps {
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

let notificationTimeout: NodeJS.Timeout;
let showNotificationFunction: (props: NotificationProps) => void = () => {};

export const showNotification = (props: NotificationProps) => {
  showNotificationFunction(props);
};

export default function Notification() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  useEffect(() => {
    showNotificationFunction = (props: NotificationProps) => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }

      setNotification(props);
      setIsVisible(true);

      notificationTimeout = setTimeout(() => {
        setIsVisible(false);
      }, props.duration || 3000);
    };

    return () => {
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, []);

  if (!isVisible || !notification) {
    return null;
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return faCheck;
      case 'error':
        return faTimes;
      case 'warning':
        return faExclamationTriangle;
      default:
        return faInfo;
    }
  };

  const getColors = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-50 border-green-500 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-500 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-500 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-500 text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div
        className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto border-l-4 ${getColors()}`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FontAwesomeIcon icon={getIcon()} className="h-5 w-5" />
            </div>
            <div className="ml-3 w-0 flex-1">
              <p className="font-medium">{notification.title}</p>
              <p className="mt-1 text-sm opacity-90">{notification.message}</p>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={() => setIsVisible(false)}
              >
                <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 