'use client';
import useReorderModal from '@/hooks/useReorderModal';
import { DisplayModal } from './ui/modal';
import { useState } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import arrayMove from 'array-move';
import { useEffect } from 'react';
import { Grip } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ReorderModal() {
  const { isOpen, onClose, projects } = useReorderModal();
  const [loading, setLoading] = useState(false);
  const [reorderItems, setReorderItems] = useState(projects);
  const router = useRouter();

  useEffect(() => {
    setReorderItems(projects);
  }, [projects]);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setReorderItems((array: any) => arrayMove(array, oldIndex, newIndex));
  };

  const handleOnReorder = async () => {
    const loadingToast = toast.loading('Reordering projects...');
    try {
      setLoading(true);
      const projectIds = reorderItems?.map(({ id }) => id);
      await axios.post('/api/projects/reorder', { projectIds });
      router.refresh();
      toast.success('Projects reordered');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    } finally {
      onClose();
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const body = (
    <div className="w-full">
      <SortableList
        onSortEnd={onSortEnd}
        draggedItemClassName="dragged"
        className="space-y-2"
      >
        {reorderItems?.map(({ id, title }) => (
          <SortableItem key={id}>
            <div
              className="flex items-center justify-between bg-secondary p-3 rounded-md w-full"
              style={{ zIndex: 99999999 }}
            >
              <div>{title}</div>
              <Grip className="h-4 w-4" />
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  );

  return (
    <DisplayModal
      title="Drag to reorder projects"
      isOpen={isOpen}
      onClose={onClose}
      body={body}
      className="max-w-lg"
      onSubmit={handleOnReorder}
      isLoading={loading}
    />
  );
}
