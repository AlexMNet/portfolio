import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/libs/serverauth';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedImage = await prismadb.image.delete({
      where: { id: params.id },
    });
    await cloudinary.uploader.destroy(deletedImage.public_id);
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ deleted: true });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await req.json();
    const { images } = body;

    const updatedProject = await prismadb.project.update({
      where: {
        id: params.id,
      },

      data: {
        images: {
          deleteMany: {},
          createMany: {
            data: images.map(
              ({ src, public_id }: { src: string; public_id: string }) => {
                return {
                  src,
                  public_id,
                };
              }
            ),
          },
        },
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
