'use client';
import useCreateModal from '@/hooks/useCreateModal';
import { DisplayModal } from './ui/modal';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Label } from './ui/label';
import { Input } from './ui/input';

export default function CreateModal() {
  const { isOpen, onClose } = useCreateModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const createModal = useCreateModal();

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
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      setLoading(true);
      const loadingToast = toast.loading('Creating project...');
      const res = await axios.post('/api/projects', data);
      toast.dismiss(loadingToast);
      toast.success('Project created successfully!');
      router.push(`/admin/${res.data.slug}`);
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    } finally {
      createModal.onClose();
      setLoading(false);
      reset();
    }
  };

  const body = (
    <form className="w-full">
      <div className="flex flex-col gap-4 flex-wrap">
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
      </div>
    </form>
  );

  if (!isOpen) return null;

  return (
    <DisplayModal
      title="Create a new project"
      isOpen={isOpen}
      onClose={onClose}
      body={body}
      className="max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={loading}
    />
  );
}
