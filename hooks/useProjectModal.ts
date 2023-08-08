import { create } from 'zustand';
import type { Project } from '@/types';
interface ProjectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setData: (data: any) => void;
  data: Project | null;
}

const useProjectModal = create<ProjectModalStore>((set) => ({
  isOpen: false,
  data: null,
  setData: (data) => set({ data }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, data: null }),
}));

export default useProjectModal;
