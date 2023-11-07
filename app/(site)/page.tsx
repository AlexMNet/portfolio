import { Typography } from '@/components/ui/typography';

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
            As a former touring musician, I have always had a passion for
            creating and building experiences. I have transferred that passion
            into software engineering!
          </Typography>
          <Typography
            variant="p"
            weight="light"
            className="dark:text-gray-300 text-gray-700"
          >
            I currently work fulltime building new and maintaining existing
            React/Next.js applications for Sandals Church as well as work for a software development agency called CodeDrips where I work with Gatsby, GraphQL and wordpress.
          </Typography>
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
