import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/libs/serverauth';

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

export async function POST(req: Request, res: Response) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await req.json();
    const { title, slug, type } = body;
    const { id } = currentUser.currentUser;

    const project = await prismadb.project.create({
      data: {
        userId: id,
        title,
        slug,
        type,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
