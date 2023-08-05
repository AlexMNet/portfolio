'use client';
import useProjectModal from '@/hooks/useProjectModal';
import { DisplayModal } from './ui/modal';
import { Typography } from './ui/typography';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectModal() {
  const { data, isOpen, onClose } = useProjectModal();

  if (!isOpen) return null;
  if (!data) return null;

  const {
    image1,
    title,
    type,
    description,
    technologies,
    live_link,
    github_link,
  } = data;

  const body = (
    <div className="flex flex-col w-full px-4 mt-4">
      <div>
        <img
          className="w-full object-cover rounded-lg aspect-video"
          src={image1}
          alt={`${title} image`}
        />
      </div>
      <div>
        <div className="flex items-center gap-2 mt-2">
          <Typography
            variant="h4"
            weight="bold"
            className="text-gray-700 dark:text-gray-100"
          >
            {title}
          </Typography>
          <span className="text-gray-500">{type}</span>
        </div>
        <div className="mt-2 flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={github_link} target="_blank">
              <Github />
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={live_link} target="_blank">
              <ExternalLink />
            </a>
          </Button>
        </div>
        <div className="mt-2">
          <Typography variant="p" className="text-gray-700 dark:text-white/70">
            {description}
          </Typography>
        </div>
        <div className="mt-2">
          <Typography>Technologies:</Typography>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {technologies.split(',').map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <DisplayModal
      isOpen={isOpen}
      onClose={onClose}
      body={body}
      className="max-w-2xl"
    />
  );
}
