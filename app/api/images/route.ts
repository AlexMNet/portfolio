import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/libs/serverauth';

export async function POST(req: Request, res: Response) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    //Image upload to cloudinary has alreay been done in the client.
    //Just save to DB.
    const body = await req.json();
    const image = body.image;

    const updatedProject = await prismadb.project.update({
      where: {
        id: body.projectId,
      },
      data: {
        images: {
          create: image,
        },
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    //TODO: Look into deleting image from cloudinary if it fails to save to DB.
    console.log(error);
  }
  return NextResponse.json({ message: 'testing delete' });
}
