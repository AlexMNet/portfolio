import { ModeToggle } from '@/components/ModeToggle';
import { Typography } from '@/components/ui/typography';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex flex-row justify-center items-center space-x-4">
        <Typography variant="h1" weight="light">
          Hello World
        </Typography>
        <ModeToggle />
      </div>
    </main>
  );
}
