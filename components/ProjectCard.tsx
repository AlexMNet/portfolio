import { Typography } from '@/components/ui/typography';
import { Circle } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    image: string;
    type: string;
    technologies: string[];
    live_link?: string;
    github_link?: string;
  };
}
export default function ProjectCard({
  project: { title, image, type, technologies },
}: ProjectCardProps) {
  return (
    <Link
      href="#"
      className="max-w-sm w-full lg:max-w-full lg:flex border rounded-md dark:shadow-none shadow hover:scale-105 transition"
    >
      <div
        className="lg:h-auto hidden lg:w-56 flex-none bg-center bg-cover rounded-l-md text-center overflow-hidden  lg:block"
        style={{
          backgroundImage: `url('${image}')`,
        }}
        title={title}
      ></div>

      <div className=" p-4 flex flex-col justify-between leading-normal">
        <div className="mb-3">
          <Typography variant="smallText" className="text-gray-500">
            {type}
          </Typography>
          <Typography variant="h4" weight="bold">
            {title}
          </Typography>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {technologies.map((tech) => (
            <div key={tech} className="flex items-center">
              <Circle className="mr-1 h-3 w-3 text-sky-400" />
              <small className="font-light">{tech}</small>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}
