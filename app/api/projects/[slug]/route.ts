import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import getCurrentUser from '@/app/libs/serverauth';

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const body = await req.json();
    const {
      title,
      slug,
      published,
      type,
      blurb,
      markdown,
      youtube_link,
      live_link,
      technologies,
    } = body;

    const updatedProject = await prismadb.project.update({
      where: {
        id: params.slug,
      },
      data: {
        title,
        slug,
        published,
        type,
        blurb,
        markdown,
        youtube_link,
        live_link,
        technologies: {
          deleteMany: {},
          connectOrCreate: technologies.map((tech: { name: string }) => {
            return {
              where: { name: tech.name },
              create: tech,
            };
          }),
        },
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
