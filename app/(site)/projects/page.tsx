import { Typography } from '@/components/ui/typography';
import ProjectCard from '@/components/ProjectCard';

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
    title: 'Learning Management System',
    description:
      'This is a learning management system that I built for Sandals Church to serve learning content to their staff and memebers',
    image: '/lms.png',
    type: 'Frontend',
    technologies: ['Next.js', 'TailwindCSS', 'Redux Toolkit', 'Auth'],
    live_link: 'https://learn.sandalschurch.com',
  },
  {
    title: 'Sermons Microsite',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/sermons.png',
    type: 'Frontend',
    technologies: ['Next.js', 'TailwindCSS', 'Zustand', 'SWR'],
    live_link: 'https://watch.sandalschurch.com/watch',
  },
  {
    title: 'Dev Portfolio',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/dev-site.png',
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
  {
    title: 'Spotify API Refresh Token Tool',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/dev-site.png',
    type: 'FullStack',
    technologies: ['Next.js', 'TailwindCSS'],
    live_link: 'https://new.alexmaldonado.dev',
  },
];

export default function Projects() {
  return (
    <main className="h-100 flex flex-col w-full max-w-2xl mx-auto items-center justify-start lg:px-0 px-4">
      <div className="flex justify-center items-start flex-col w-full ">
        <article className="max-w-2xl text-left">
          <Typography variant="h1" weight="bold" className="text-start">
            Projects.
          </Typography>
          <div className="flex flex-wrap gap-3 my-6">
            {/* Card */}
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}
