import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export async function POST(req) {
  await dbConnect();
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    // Set a simple session cookie
    cookies().set('admin_session', user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Logged in successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
