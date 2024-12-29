export async function logChange(change: {
  user: string;
  action: string;
  section: string;
  details: string;
}) {
  try {
    const response = await fetch('/api/history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(change),
    });

    if (!response.ok) {
      throw new Error('Failed to log change');
    }

    return true;
  } catch (error) {
    console.error('Error logging change:', error);
    return false;
  }
} 