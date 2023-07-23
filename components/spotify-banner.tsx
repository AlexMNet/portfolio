import { Typography } from './ui/typography';
import { Disc3 } from 'lucide-react';

export function SpotifyBanner() {
  return (
    <>
      <div className="w-full border dark:border-none dark:bg-gray-900 flex items-center justify-between rounded-sm p-2 my-4">
        <div>
          <Disc3 size={24} className="text-green-500" />
        </div>
        <Typography variant="smallText" weight="light" className="ml-2">
          Last played{' '}
          <span className="underline cursor-pointer">This means war</span> by{' '}
          <span className="underline cursor-pointer">Avenged Sevenfold</span>
        </Typography>
        <div>
          <Disc3 size={24} className="text-green-500" />
        </div>
      </div>
    </>
  );
}
