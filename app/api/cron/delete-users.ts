import prismadb from '@/app/libs/prismadb';
import { sendCronDeleteUsersEmail } from '@/app/libs/sendEmail';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, res: Response) {
  try {
    const users = await prismadb.user.findMany({
      where: {
        role: 'user',
      },
    });

    if (users.length > 0) {
      const deletedUsers = await prismadb.user.deleteMany({
        where: {
          role: 'user',
        },
      });

      // Users that were deleted
      const emails = users.map((user) => user.email).join(', ');

      await sendCronDeleteUsersEmail(
        `${users.length} Users deleted: ${emails}`
      );
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error: any) {
    console.log(error.response.body);
    return NextResponse.error();
  }
}
