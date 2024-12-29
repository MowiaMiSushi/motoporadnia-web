import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Sprawdź czy admin istnieje
    const admin = await db.collection('users').findOne({ role: 'admin' });
    
    if (!admin) {
      // Jeśli nie ma admina, zwróć informację
      return NextResponse.json({ 
        error: 'Admin not found',
        message: 'No admin user in database'
      });
    }

    // Zwróć informację o adminie (bez hasła)
    const { password, ...adminInfo } = admin;
    return NextResponse.json({ 
      message: 'Admin exists',
      admin: adminInfo
    });

  } catch (error) {
    console.error('Database check error:', error);
    return NextResponse.json({ 
      error: 'Database error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 