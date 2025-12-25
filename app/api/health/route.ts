import { NextResponse } from 'next/server';
import { auth } from '@/firebase/admin';

export async function GET() {
  try {
    if (!auth) {
      return NextResponse.json(
        { status: 'error', message: 'Firebase Admin not initialized' },
        { status: 500 }
      );
    }

    // Try to list users as a test (first 1 user)
    const listUsersResult = await auth.listUsers(1);
    
    return NextResponse.json({
      status: 'ok',
      firebaseAdmin: 'connected',
      usersCount: listUsersResult.users.length
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Firebase Admin connection failed',
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
