import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import prismadb from '@/app/libs/prismadb';

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
