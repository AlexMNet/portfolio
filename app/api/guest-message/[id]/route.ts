import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedGuestMessage = await prismadb.guestMessage.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: 'message successfully deleted' });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}

//Consider only allowing user with email matching email in message to delete.
//This is handled on the frontend for now.
