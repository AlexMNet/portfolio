'use client';
import { Typography } from '@/components/ui/typography';
import useProjectModal from '@/hooks/useProjectModal';

const projects: {
  title: string;
  description: string;
  image1?: string;
  image2?: string;
  type: string;
  technologies: string;
  live_link?: string;
  github_link?: string;
}[] = [
  {
    title: 'Sandals Next',
    description:
      'This is a learning management system that I built for Sandals Church to serve learning content to their staff and memebers',
    image1:
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGFwdG9wJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60',
    type: 'Frontend',
    technologies: 'Next.js, TailwindCSS, Redux Toolkit, Auth',
    live_link: 'https://learn.sandalschurch.com',
    github_link: 'https://www.github.com',
  },
  {
    title: 'Sandals - LMS',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image1:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1715&q=80',
    type: 'Frontend',
    technologies: 'Next.js, TailwindCSS, Zustand, SWR',
    live_link: 'https://watch.sandalschurch.com/watch',
    github_link: 'https://www.github.com',
  },
  {
    title: 'Portfolio',
    description:
      'A microsite created for Sandals Church to serve weekly sermon content. Highlight feature is a search/filter page.',
    image1:
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGxhcHRvcCUyMHdlYnNpdGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60',
    type: 'Fullstack',
    technologies: 'Next.js, TailwindCSS, shadcn/ui, Prisma, MongoDB, NextAuth',
    live_link: 'https://new.alexmaldonado.dev',
    github_link: 'https://www.github.com',
  },
];

export default function ProjectGrid() {
  const projectModal = useProjectModal();
  return (
    <div className="cursor-pointer w-full mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12">
      {projects.map((project) => (
        <div
          onClick={() => {
            projectModal.setData(project);
            projectModal.onOpen();
          }}
          key={project.title}
        >
          <div className="max-w-sm">
            <div className="rounded-sm">
              <img
                className="aspect-[4/5] w-full h-full rounded-sm object-cover opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out"
                src={project.image1}
                alt="Work"
              />
            </div>
            <div>
              <Typography
                variant="h4"
                weight="bold"
                className="mt-2 text-gray-700 dark:text-gray-100"
              >
                {project.title}
              </Typography>
              <Typography variant="smallText" className="text-gray-500">
                {project.type}
              </Typography>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
