import { Typography } from '@/components/ui/typography';
import prismadb from '@/app/libs/prismadb';
import ProjectSelector from './components/project-selector';

export const revalidate = 0;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await prismadb.project.findMany({
    include: {
      technologies: true,
      images: true,
    },
    orderBy: {
      position: 'asc',
    },
  });

  return (
    <>
      <div className="pb-10">
        <div className="max-w-7xl w-full mx-auto px-6">
          <div className="flex items-center justify-between">
            <Typography
              variant="h3"
              weight="bold"
              className="mt-2 tracking-tighter underline text-docoration-thick decoration-double decoration-gray-400"
            >
              Dashboard
            </Typography>
            <ProjectSelector projects={projects} />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
