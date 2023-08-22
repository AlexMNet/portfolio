import { NextResponse } from 'next/server';
import prismadb from '@/app/libs/prismadb';
import cloudinary from '@/lib/cloudinary';
import getCurrentUser from '@/app/libs/serverauth';

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
    const {
      title,
      slug,
      published,
      type,
      blurb,
      markdown,
      youtube_link,
      github_link,
      live_link,
      technologies,
    } = body;

    const updatedProject = await prismadb.project.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        slug,
        published,
        type,
        blurb,
        markdown,
        youtube_link,
        github_link,
        live_link,
        technologies: {
          set: [],
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    //Disconnect all technologies associated with project
    const project = await prismadb.project.update({
      where: {
        id: params.id,
      },
      data: {
        technologies: {
          set: [],
        },
      },
    });

    //Get images
    const images = await prismadb.image.findMany({
      where: {
        projectId: params.id,
      },
    });

    //Delete project
    const deletedProject = await prismadb.project.delete({
      where: {
        id: params.id,
      },
    });

    //Delete images from cloudinary if there are images and project is deleted
    if (images.length > 0) {
      const imagePublicIds = images.map((image) => image.public_id);

      await cloudinary.api.delete_resources(imagePublicIds);
    }

    //Update position of projects
    const projectToUpdate = await prismadb.project.findMany({
      where: {
        position: {
          gt: deletedProject.position,
        },
      },
    });

    if (projectToUpdate.length > 0) {
      for (let i = 0; i < projectToUpdate.length; i++) {
        const project = projectToUpdate[i];

        await prismadb.project.update({
          where: {
            id: project.id,
          },
          data: {
            position: project.position - 1,
          },
        });
      }
    }

    return NextResponse.json(deletedProject);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
