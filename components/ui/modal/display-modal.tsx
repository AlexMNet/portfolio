'use client';
import { Loader2, X } from 'lucide-react';
import { Button } from '../button';
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside';
import { cn } from '@/lib/utils';

interface ModalProps {
  body?: React.ReactElement;
  onSubmit?: () => void;
  onClose: () => void;
  isOpen: boolean;
  title?: string;
  description?: string;
  isLoading?: boolean;
  className?: string;
}

export default function DisplayModal({
  body,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  title,
  description,
  className,
}: ModalProps) {
  useCloseOnClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div
      id="overlay"
      className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm overflow-y-auto pb-16 pt-4 flex flex-col justify-start items-center"
    >
      {/* Content */}
      <div
        className={cn(
          'animate-in fade-in zoom-in  border grid w-full max-w-lg gap-4 bg-background p-6 shadow-lg sm:rounded-lg md:w-full relative',
          className
        )}
      >
        <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none ">
          <Button variant="outline" onClick={() => onClose()}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        {/* Header */}
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          {/* Title */}
          <div className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </div>
          {/* Description */}
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
        {/* Body */}
        <div className="flex flex-col items-center justify-center gap-4">
          {body}
        </div>
        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          {onSubmit && (
            <Button onClick={onSubmit} type="submit">
              Submit
              {isLoading && <Loader2 className="ml-2 animate-spin" />}
            </Button>
          )}
          <Button onClick={() => onClose()} variant="outline" type="button">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
