import { ModeToggle } from '@/components/mode-toggle';
import { Typography } from '@/components/ui/typography';

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Typography variant="h1" weight="light">
        Hello World
      </Typography>
      <ModeToggle />
    </main>
  );
}
