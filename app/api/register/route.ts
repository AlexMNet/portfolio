import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { email, name, password } = body;

  if (email !== process.env.NEXTAUTH_ADMIN_EMAIL) {
    return NextResponse.json(
      { error: 'You are not authorized to register.' },
      { status: 401 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
