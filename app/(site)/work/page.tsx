import { Typography } from '@/components/ui/typography';

const projects: {
  title: string;
  description: string;
  image: string;
  type: string;
  technologies: string[];
  live_link?: string;
  github_link?: string;
}[] = [
  {
    title: 'Sandals Next',
    description:
      'This is a learning management system that I built for Sandals Church to serve learning content to their staff and memebers',
    image: '/sandals-next.png',
    type: 'Frontend',
    technologies: ['Next.js', 'TailwindCSS', 'Redux Toolkit', 'Auth'],
    live_link: 'https://learn.sandalschurch.com',
  },
  {
    title: 'Sandals - LMS',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/sandals-learn.png',
    type: 'Frontend',
    technologies: ['Next.js', 'TailwindCSS', 'Zustand', 'SWR'],
    live_link: 'https://watch.sandalschurch.com/watch',
  },
  {
    title: 'Portfolio',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/portfolio.png',
    type: 'Fullstack',
    technologies: [
      'Next.js',
      'TailwindCSS',
      'shadcn/ui',
      'Prisma',
      'MongoDB',
      'NextAuth',
    ],
    live_link: 'https://new.alexmaldonado.dev',
  },
];

export default function Work() {
  return (
    <div className="h-full w-full">
      <div className="max-w-7xl w-full mx-auto px-6">
        <div className="">
          <Typography
            variant="h3"
            weight="bold"
            className="mt-2 tracking-tighter underline text-docoration-thick decoration-double decoration-gray-400"
          >
            Latest work
          </Typography>
        </div>

        {/* Image Gallery */}
        <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map(({ image, title, type }) => (
            <a href="#" key={title}>
              <div className="max-w-sm">
                <div>
                  <img
                    className="aspect-[4/5] w-full h-full rounded-sm ring ring-black object-cover"
                    src={image}
                    alt="Work"
                  />
                </div>
                <div>
                  <Typography
                    variant="h4"
                    weight="bold"
                    className="mt-2 text-gray-700 dark:text-gray-100"
                  >
                    {title}
                  </Typography>
                  <Typography variant="smallText" className="text-gray-500">
                    {type}
                  </Typography>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
