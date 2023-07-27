import { Typography } from '@/components/ui/typography';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div>
        <Typography variant="h1" weight="bold">
          Admin Page
        </Typography>
      </div>
    );
  }

  return (
    <main className="h-100 flex flex-col w-full max-w-2xl mx-auto items-center justify-start lg:px-0 px-4">
      <div className="flex justify-center items-start flex-col w-full ">
        <article className="max-w-2xl text-left">
          <Typography variant="h1" weight="bold" className="text-start">
            Admin.
          </Typography>
        </article>
      </div>
    </main>
  );
}
