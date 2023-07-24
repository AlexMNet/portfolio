import { Typography } from '@/components/ui/typography';
import { Spotify } from '@/components/spotify';
import { SocialMedia } from '@/components/social-media';

export default function Home() {
  return (
    <main className="h-100 flex flex-col w-full max-w-6xl mx-auto items-center justify-start px-4">
      <div className="flex justify-center items-center flex-col text-start ">
        <article className="max-w-lg">
          <Typography variant="h6" weight="light" className="text-blue-500">
            Software Developer
          </Typography>
          <Typography variant="h1" weight="bold">
            Alex Maldonado
          </Typography>
          <Typography variant="p" weight="light">
            I am a software developer based in Southern California. I love to
            build user experiences that are intuitive, simple and beautiful.
          </Typography>
          <Typography variant="p" weight="light">
            I currently work fulltime for Sandals Church where I build new and
            maintain existing React/Next.js applications.
          </Typography>

          <SocialMedia />
          <div className="my-4">
            <Spotify />
          </div>
        </article>
      </div>
    </main>
  );
}
