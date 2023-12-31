import prismadb from '@/app/libs/prismadb';
import DashboardContent from './components/dashboard-content';

export default async function Admin({
  params,
}: {
  params: { projectId: string };
}) {
  const project = await prismadb.project.findUnique({
    where: {
      slug: params.projectId,
    },
    include: {
      images: true,
      technologies: true,
    },
  });

  if (!project) {
    return <div className="pb-10">Project not found</div>;
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <DashboardContent project={project} />
    </div>
  );
}
