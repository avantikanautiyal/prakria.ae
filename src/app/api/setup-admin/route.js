import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  await dbConnect();
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return NextResponse.json({ message: "Admin user already exists" });
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin = await User.create({
      email: "admin@prakria.com",
      password: hashedPassword,
      name: "Admin",
    });

    return NextResponse.json({ message: "Admin user created successfully", email: admin.email });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
