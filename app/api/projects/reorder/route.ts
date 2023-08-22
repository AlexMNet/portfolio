import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/libs/serverauth';

export async function POST(req: Request, res: Response) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await req.json();
    const { projectIds } = body;

    for (let i = 0; i < projectIds.length; i++) {
      await prismadb.project.update({
        where: {
          id: projectIds[i],
        },
        data: {
          position: i + 1,
        },
      });
    }

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
