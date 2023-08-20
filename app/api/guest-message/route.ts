import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import filter from 'leo-profanity';

export async function GET(req: Request, res: Response) {
  try {
    const guestMessages = await prismadb.guestMessage.findMany();

    return NextResponse.json(guestMessages);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { name, message, email } = body;

    const filteredMessage = filter.clean(message);

    const guestMessage = await prismadb.guestMessage.create({
      data: {
        name,
        message: filteredMessage,
        email,
      },
    });

    return NextResponse.json(guestMessage);
  } catch (error: any) {
    console.log(error);
    return NextResponse.error();
  }
}
