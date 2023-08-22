'use client';
import { useState } from 'react';
import useProjectModal from '@/hooks/useProjectModal';
import { DisplayModal } from './ui/modal';
import { Typography } from './ui/typography';
import { Button } from './ui/button';
import { Expand, ExternalLink, Github, ImageOff } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export default function ProjectModal() {
  const { data, isOpen, onClose } = useProjectModal();
  const [open, setOpen] = useState(false);

  if (!isOpen) return null;
  if (!data) return null;

  const { title, markdown, github_link, live_link, images, type } = data;

  const lightBoxImages = images.map((image) => ({
    src: image.src,
  }));

  const body = (
    <div className="flex flex-col w-full px-4 mt-4">
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={lightBoxImages}
        plugins={[Thumbnails]}
        carousel={{ finite: true }}
      />
      <div>
        {images[1] ? (
          <button
            onClick={() => setOpen(true)}
            className="flex flex-col gap-[1px]"
          >
            <img
              className="w-full object-cover rounded-lg aspect-video"
              src={images[1].src}
              alt={`${title} image`}
            />
            <div className="flex items-center justify-end text-xs text-gray-400 rounded-b-lg w-full">
              <Expand size={10} className="inline mr-1" />
              {lightBoxImages.length}{' '}
              {lightBoxImages.length > 1 ? 'images' : 'image'}
            </div>
          </button>
        ) : (
          <div className="w-full rounded-lg aspect-video bg-gray-500 flex flex-col items-center justify-center">
            <ImageOff size={100} />
            <Typography variant="smallText" className="mt-2 ">
              Opps no image!
            </Typography>
          </div>
        )}
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
