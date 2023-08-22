import { create } from 'zustand';
import { Project } from '@/types';

interface ReorderModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onEdit: (project: Project[]) => void;
  onClose: () => void;
  projects: Project[] | null;
}

const useReorderModal = create<ReorderModalStore>((set) => ({
  isOpen: false,
  projects: null,
  onOpen: () => set({ isOpen: true }),
  onEdit: (projects: Project[]) => set({ projects: projects, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useReorderModal;
