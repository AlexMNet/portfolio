import { Typography } from '@/components/ui/typography';
import ProjectGrid from './components/ProjectGrid';
import prismadb from '@/app/libs/prismadb';

export default async function Work() {
  const projects = await prismadb.project.findMany({
    include: {
      technologies: true,
      images: true,
    },
  });

  return (
    <div className="pb-10">
      <div className="max-w-7xl w-full mx-auto px-6">
        <div className="">
          <Typography
            variant="h3"
            weight="bold"
            className="mt-2 tracking-tighter underline text-docoration-thick decoration-double decoration-gray-400"
          >
            Latest work
          </Typography>
        </div>

        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
