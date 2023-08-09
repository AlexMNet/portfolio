'use client';
import useProjectModal from '@/hooks/useProjectModal';
import { DisplayModal } from './ui/modal';
import { Typography } from './ui/typography';
import { Button } from './ui/button';
import { ExternalLink, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ProjectModal() {
  const { data, isOpen, onClose } = useProjectModal();

  if (!isOpen) return null;
  if (!data) return null;

  const {
    title,
    markdown,
    github_link,
    live_link,
    technologies,
    images,
    type,
  } = data;

  const body = (
    <div className="flex flex-col w-full px-4 mt-4">
      <div>
        <img
          className="w-full object-cover rounded-lg aspect-video"
          src={images[0].src}
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
          {github_link && (
            <Button variant="outline" size="sm" asChild>
              <a href={github_link} target="_blank">
                <Github />
              </a>
            </Button>
          )}
          {live_link && (
            <Button variant="outline" size="sm" asChild>
              <a href={live_link} target="_blank">
                <ExternalLink />
              </a>
            </Button>
          )}
        </div>
        {markdown && (
          <div className="mt-2">
            <ReactMarkdown className="prose dark:prose-invert">
              {markdown}
            </ReactMarkdown>
          </div>
        )}
        <div className="mt-2">
          <Typography>Technologies:</Typography>
          <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
            {technologies.map(({ id, name }: { id: string; name: string }) => (
              <li key={id}>{name}</li>
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
