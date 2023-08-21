'use client';
import { Typography } from '@/components/ui/typography';
import useProjectModal from '@/hooks/useProjectModal';
import { Project } from '@/types';
import { ImageOff } from 'lucide-react';

export interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
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
              {project.images[0] ? (
                <img
                  className="aspect-[4/5] w-full h-full rounded-sm object-cover opacity-80 hover:opacity-100 transition-all duration-300 ease-in-out"
                  src={project.images[0].src}
                  alt="Work"
                />
              ) : (
                <div className="aspect-[4/5] w-full h-full rounded-sm bg-gray-500 flex flex-col items-center justify-center">
                  <ImageOff size={100} />
                  <Typography variant="smallText" className="mt-2 ">
                    Opps no image!
                  </Typography>
                </div>
              )}
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
