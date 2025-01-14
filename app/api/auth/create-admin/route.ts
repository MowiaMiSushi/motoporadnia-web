import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    
    // Sprawdź czy admin już istnieje
    const existingAdmin = await db.collection('users').findOne({ role: 'admin' });
    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    // Utwórz nowego admina
    const hashedPassword = await hash('admin123', 12);
    const newAdmin = {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@motoporadnia.pl',
      role: 'admin',
      createdAt: new Date(),
    };

    await db.collection('users').insertOne(newAdmin);
    
    return NextResponse.json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
} 