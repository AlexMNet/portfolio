'use client';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Minus, Plus, X } from 'lucide-react';
import type { Project } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitHandler, useForm, useFieldArray } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import MDEditor from '@uiw/react-md-editor';
import { toast } from 'react-hot-toast';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';

export default function DashboardContent({ project }: { project: Project }) {
  const [loading, setLoading] = useState(false);
  const [editingImageOrder, setEditingImageOrder] = useState(false);
  const [images, setImages] = useState(project.images);
  const router = useRouter();

  useEffect(() => {
    setImages(project.images);
  }, [project.images]);

  const formSchema = z.object({
    title: z
      .string()
      .trim()
      .min(3, { message: 'Title must be at least 3 characters long' }),
    slug: z
      .string()
      .trim()
      .min(3, { message: 'Slug must be at least 3 characters long' }),
    type: z
      .string()
      .trim()
      .min(3, { message: 'Type must be at least 3 characters' }),
    blurb: z.string().trim(),
    markdown: z
      .string({ required_error: 'Must provide markdown content' })
      .trim(),
    youtube_link: z.string(),
    github_link: z.string(),
    live_link: z.string(),
    technologies: z.array(z.object({ name: z.string().trim() })),
    published: z.boolean(),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'technologies',
    control,
  });

  useEffect(() => {
    reset({
      title: project.title || '',
      slug: project.slug || '',
      type: project.type || '',
      published: project.published || false,
      blurb: project.blurb || '',
      markdown: project.markdown || '',
      youtube_link: project.youtube_link || '',
      github_link: project.github_link || '',
      live_link: project.live_link || '',
      technologies: project.technologies.map((technology) => ({
        name: technology.name,
      })),
    });
  }, [reset, project]);

  const markdown = watch('markdown');
  const slug = watch('slug');
  const published = watch('published');

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setLoading(true);
      const loadingToast = toast.loading('Updating project...');

      const res = await axios.put(`/api/projects/${project.id}`, data);

      toast.dismiss(loadingToast);
      toast.success('Project updated successfully');

      router.push(`/admin/${slug}`);
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnImageDelete = async (id: string) => {
    try {
      setLoading(true);
      const loadingToast = toast.loading('Deleting image...');

      await axios.delete(`/api/images/${id}`);

      toast.dismiss(loadingToast);
      toast.success('Image Deleted Successfully');

      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
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

  const handleOnDelete = async (id: string) => {
    try {
      setLoading(true);
      const loadingToast = toast.loading('Deleting project...');

      await axios.delete(`/api/projects/${id}`);

      toast.dismiss(loadingToast);
      toast.success('Project Deleted Successfully');
      router.push('/admin');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setImages((array) => arrayMove(array, oldIndex, newIndex));
    setEditingImageOrder(true);
  };

  const handleNewOrder = async () => {
    try {
      setLoading(true);
      await axios.put(`/api/images/${project.id}`, { images });
      setEditingImageOrder(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelImageOrder = () => {
    setImages(project.images);
    setEditingImageOrder(false);
  };

  return (
    <div className="border p-4 rounded-sm mb-12 relative">
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
      {/* Delete Project */}
      <div className="w-full flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete project?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                onClick={() => handleOnDelete(project.id)}
                variant="destructive"
                type="button"
              >
                Delete
              </Button>
              <DialogTrigger asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Image Management */}
      <div className="flex gap-4 flex-wrap mb-6">
        <SortableList
          onSortEnd={onSortEnd}
          className="flex gap-4 flex-wrap"
          draggedItemClassName="dragged"
        >
          {images.map((image, idx) => (
            <SortableItem key={image.id}>
              <div className={`relative ${loading ? 'animate-pulse' : ''}`}>
                <img
                  draggable={false}
                  className="w-32 h-32 object-cover rounded-md"
                  src={image.src}
                  alt=""
                />
                <Button
                  disabled={loading}
                  variant="destructive"
                  size="icon"
                  className="top-0 absolute right-0 w-6 h-6"
                  onClick={() => handleOnImageDelete(image.id)}
                >
                  <X size={18} />
                </Button>
                <small>
                  {idx === 0 ? 'Card Image' : idx === 1 ? 'Modal Image' : ''}
                </small>
              </div>
            </SortableItem>
          ))}
        </SortableList>

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
                disabled={loading}
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
        {editingImageOrder && (
          <div className="flex flex-col">
            <Button variant="link" onClick={handleNewOrder}>
              {loading ? 'Saving...' : 'Save image order'}
            </Button>
            {!loading && (
              <Button variant="link" onClick={cancelImageOrder}>
                Cancel
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 flex-wrap">
          <Typography variant="h6">Project Information</Typography>
          <Separator />
          {/* Published */}
          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={() => setValue('published', !published)}
            />
            <Label
              htmlFor="published"
              className={`${published ? 'text-green-500' : 'text-red-500'}`}
            >
              Published
            </Label>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" {...register('title')} />
            <small className="text-red-500">{errors?.title?.message}</small>
          </div>
          {/* Slug */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" type="text" {...register('slug')} />
            <small className="text-red-500">{errors?.slug?.message}</small>
          </div>
          {/* Type */}
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" type="text" {...register('type')} />
            <small className="text-red-500">{errors?.type?.message}</small>
          </div>
          {/* Blurb */}
          <div>
            <Label htmlFor="blurb">Blurb</Label>
            <Input id="blurb" type="text" {...register('blurb')} />
            <small className="text-red-500">{errors?.blurb?.message}</small>
          </div>
          {/* Markdown */}
          <div>
            <Label htmlFor="markdown">Markdown</Label>
            <MDEditor
              value={markdown}
              onChange={(value: string | undefined) =>
                setValue('markdown', value || '')
              }
            />
            <small className="text-red-500">{errors?.markdown?.message}</small>
          </div>
          {/* Youtube Link */}
          <div>
            <Label htmlFor="youtube_link">Youtube Link</Label>
            <Input
              id="youtube_link"
              type="text"
              {...register('youtube_link')}
            />
            <small className="text-red-500">
              {errors?.youtube_link?.message}
            </small>
          </div>
          {/* Github Link */}
          <div>
            <Label htmlFor="github_link">Github Link</Label>
            <Input id="github_link" type="text" {...register('github_link')} />
            <small className="text-red-500">
              {errors?.github_link?.message}
            </small>
          </div>
          {/* Live Link */}
          <div>
            <Label htmlFor="live_link">Live Link</Label>
            <Input id="live_link" type="text" {...register('live_link')} />
            <small className="text-red-500">{errors?.live_link?.message}</small>
          </div>
          {/* Technologies */}
          <Typography variant="h6">Technologies</Typography>
          <div className="flex gap-4 flex-wrap">
            {fields.map((field, index) => (
              <div key={field.id} className="flex">
                <div className="flex items-center">
                  <Input
                    id={`technologies.${index}.name`}
                    type="text"
                    placeholder='e.g. "React"'
                    {...register(`technologies.${index}.name` as const)}
                  />
                  <Button
                    disabled={loading}
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Minus size={18} />
                  </Button>
                </div>
                <small className="text-red-500">
                  {errors?.technologies?.[index]?.name?.message}
                </small>
              </div>
            ))}
            <Button
              disabled={loading}
              variant="outline"
              type="button"
              onClick={() => append({ name: '' })}
            >
              <Plus size={20} />
              Add Tech
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <div>
              <Button disabled={loading} type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
