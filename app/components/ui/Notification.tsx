'use client';

import toast from 'react-hot-toast';

type NotificationType = 'success' | 'error' | 'loading';

export const showNotification = (type: NotificationType, message: string) => {
  switch (type) {
    case 'success':
      toast.success(message);
      break;
    case 'error':
      toast.error(message);
      break;
    case 'loading':
      toast.loading(message);
      break;
    default:
      toast(message);
  }
}; 