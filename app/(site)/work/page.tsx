import { Typography } from '@/components/ui/typography';
import ProjectGrid from './components/ProjectGrid';

const projects: {
  title: string;
  description: string;
  image: string;
  type: string;
  technologies: string;
  live_link?: string;
  github_link?: string;
}[] = [
  {
    title: 'Sandals Next',
    description:
      'This is a learning management system that I built for Sandals Church to serve learning content to their staff and memebers',
    image: '/sandals-next.png',
    type: 'Frontend',
    technologies: 'Next.js, TailwindCSS, Redux Toolkit, Auth',
    live_link: 'https://learn.sandalschurch.com',
  },
  {
    title: 'Sandals - LMS',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/sandals-learn.png',
    type: 'Frontend',
    technologies: 'Next.js, TailwindCSS, Zustand, SWR',
    live_link: 'https://watch.sandalschurch.com/watch',
  },
  {
    title: 'Portfolio',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image: '/portfolio.png',
    type: 'Fullstack',
    technologies: 'Next.js, TailwindCSS, Zustand, Next-Auth, Prisma, MongoDB',
    live_link: 'https://new.alexmaldonado.dev',
  },
];

export default function Work() {
  return (
    <div className="pb-10">
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

        <ProjectGrid />
      </div>
    </div>
  );
}
