import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 401 }
      );
    }

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
        role: email === process.env.NEXTAUTH_ADMIN_EMAIL ? 'admin' : 'user',
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { error: 'You are not authorized to register.' },
      { status: 401 }
    );
  }
}
