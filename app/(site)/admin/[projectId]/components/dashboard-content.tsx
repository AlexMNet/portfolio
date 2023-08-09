'use client';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, X } from 'lucide-react';
import type { Project } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function DashboardContent({ project }: { project: Project }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOnImageDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/images/${id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnImageUpload = async (image: any) => {
    try {
      setLoading(true);
      const uploadedImage = {
        src: image.url,
        public_id: image.public_id,
        type: 'modal',
      };

      await axios.post(`/api/images`, {
        image: uploadedImage,
        projectId: project.id,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-sm">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <Typography variant="h5" className="mb-2">
          {project.title}
        </Typography>
        <Typography
          variant="smallText"
          className="mb-2 dark:text-gray-400 text-gray-600"
        >
          {`last updated: ${project.createdAt.toLocaleTimeString('en-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}`}
        </Typography>
      </div>
      {/* Images */}
      <div className="flex gap-4 flex-wrap mb-6">
        {project.images.map((image) => (
          <div
            key={image.id}
            className={`relative ${loading ? 'animate-pulse' : ''}`}
          >
            <img
              className="w-32 h-32 object-cover rounded-md"
              src={image.src}
              alt=""
            />
            <Button
              variant="destructive"
              size="icon"
              className="top-0 absolute right-0 w-6 h-6"
              onClick={() => handleOnImageDelete(image.id)}
            >
              <X size={18} />
            </Button>
          </div>
        ))}
        <CldUploadWidget
          onUpload={(result: any) => handleOnImageUpload(result.info)}
          uploadPreset="emwnhvxf"
        >
          {({ open }) => {
            function handleOnClick(e: any) {
              e.preventDefault();
              open();
            }
            return (
              <button
                className="w-32 h-32 flex flex-col gap-2 justify-center items-center border border-dotted rounded-md border-gray-600 dark:border-gray-400 text-gray-600 dark:text-gray-400"
                onClick={handleOnClick}
              >
                <ImageIcon size={32} />
                <Typography
                  variant="smallText"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Add Image
                </Typography>
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}
