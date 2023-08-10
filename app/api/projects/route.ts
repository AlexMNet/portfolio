import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function GET(req: Request, res: Response) {
  try {
    const projects = await prismadb.project.findMany({
      include: {
        images: true,
        technologies: true,
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
