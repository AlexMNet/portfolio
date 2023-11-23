import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <section>
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start lg:mt-32 justify-end mt-12 lg:justify-center text-center lg:text-start px-6 gap-4 lg:gap-0">
        <article className="max-w-2xl flex items-center justify-center flex-col">
          <Typography
            variant="h1"
            weight="bold"
            className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl "
          >
            👋🏾 I am a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
              Software Engineer
            </span>{' '}
            based in Southern California.
          </Typography>
          <Typography
            variant="p"
            weight="light"
            className="dark:text-gray-300 text-gray-700"
          >
            In my past life, I toured as a musician, where I honed my skills in
            creating and building unique experiences. Now, I&apos;ve seamlessly
            transitioned that passion into software engineering!
          </Typography>
          <Typography
            variant="p"
            weight="light"
            className="dark:text-gray-300 text-gray-700"
          >
            Currently, I&apos;m immersed in the world of React/Next.js
            applications at Sandals Church, crafting new experiences and
            maintaining existing ones. Additionally, I contribute my skills to
            CodeDrips, a software development agency, where I delve into
            projects using Gatsby, GraphQL, and WordPress.
          </Typography>
          <div className="self-center lg:self-start mt-6">
            <Link
              href="/work"
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              See My Work <ArrowRight className="ml-2" />
            </Link>
          </div>
        </article>
        <div>
          <div className="rounded-full overflow-hidden relative w-52 h-52 lg:w-72 lg:h-72 xl:h-96 xl:w-96 ring ring-black">
            <img src="/alex.jpg" alt="" className="w-full absolute " />
          </div>
        </div>
      </div>
    </section>
  );
}
