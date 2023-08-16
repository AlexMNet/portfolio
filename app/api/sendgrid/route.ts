import { sendAdminEmail, sendClientEmail } from '@/app/libs/sendEmail';

import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();

    const { fullName, email, subject, message } = body;

    //Send message to admin
    await sendAdminEmail({ fullName, email, subject, message });

    //Send Client email
    await sendClientEmail({ fullName, email });

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: any) {
    console.log(error.response.body);
    return NextResponse.error();
  }
}
