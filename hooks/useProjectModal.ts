import { create } from 'zustand';

type ProjectData = {
  id?: string;
  title: string;
  image1: string;
  image2?: string;
  description: string;
  type: string;
  technologies: string;
  live_link: string;
  github_link: string;
};

interface ProjectModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setData: (data: any) => void;
  data: ProjectData | null;
}

const useProjectModal = create<ProjectModalStore>((set) => ({
  isOpen: false,
  data: null,
  setData: (data) => set({ data }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, data: null }),
}));

export default useProjectModal;
