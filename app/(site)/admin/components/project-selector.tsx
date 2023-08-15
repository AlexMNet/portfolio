'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';

import { Check, ChevronsUpDown, Plus } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import type { Project } from '@/types';
import useCreateModal from '@/hooks/useCreateModal';

interface ProjectSelectorProps {
  projects: Project[];
}

export default function ProjectSelector({ projects }: ProjectSelectorProps) {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const createModal = useCreateModal();

  const onProjectSelect = (project: Project) => {
    setOpen(false);
    router.push(`/admin/${project.slug}`);
  };

  const currentProject = projects.find(
    (project) => project.slug === params.projectId
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a project"
        >
          {currentProject?.title ||
            (projects.length === 0 ? 'Add project' : 'Select a project')}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No Project Found</CommandEmpty>
            <CommandGroup heading="Projects">
              {projects.map((project) => (
                <CommandItem
                  key={project.id}
                  onSelect={() => onProjectSelect(project)}
                >
                  {project.title}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4 ',
                      currentProject?.title === project.title
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="cursor-pointer"
                onSelect={() => createModal.onOpen()}
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
