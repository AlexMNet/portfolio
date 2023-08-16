import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { token } = body;

    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    return NextResponse.json(res.data);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
