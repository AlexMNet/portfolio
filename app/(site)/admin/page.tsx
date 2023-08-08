import prismadb from '@/app/libs/prismadb';
import { redirect } from 'next/navigation';

export default async function Index() {
  const projects = await prismadb.project.findMany({});

  if (projects.length > 0) {
    redirect(`/admin/${projects[0].slug}`);
  }

  return <div className="pb-10">dash content</div>;
}
