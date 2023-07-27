'use client';
import { Typography } from '@/components/ui/typography';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Error() {
  const params = useSearchParams();
  const router = useRouter();
  const message = params.get('error');

  return (
    <div className="h-screen flex items-center mt-24 flex-col">
      <Typography variant="h3" className="text-center" weight="bold">
        Something Went Wrong!
      </Typography>
      <Typography variant="h5" className="text-center" weight="light">
        {message}
      </Typography>
      <div className="flex gap-2 mt-4">
        <Button onClick={() => router.push('/')}>Home Page</Button>
        <Button onClick={() => router.push('/admin')} variant="outline">
          Sign In
        </Button>
      </div>
    </div>
  );
}
