import prismadb from '@/app/libs/prismadb';
import { Typography } from '@/components/ui/typography';
import { Frown } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function Index() {
  const projects = await prismadb.project.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  if (projects.length > 0) {
    redirect(`/admin/${projects[0].slug}`);
  }

  return (
    <div className="max-w-7xl w-full mx-auto px-6">
      <div className="flex flex-col items-center justify-center mx-auto">
        <Frown size={48} />
        <Typography variant="h4" weight="bold" className="mt-2 text-center">
          How would you get hired without any projects? To add a project click
          on the top right button. =)
        </Typography>
      </div>
    </div>
  );
}
