import { Button } from '@/components/ui/button';
import { Github, Instagram, Linkedin } from 'lucide-react';

export function SocialMedia() {
  return (
    <div className="flex space-x-4 items-center justify-start mt-4">
      <Button asChild variant="outline" size="icon">
        <a href="https://github.com/AlexMNet" target="_blank">
          <Github size={24} />
        </a>
      </Button>
      <Button asChild variant="outline" size="icon">
        <a href="https://www.linkedin.com/in/alexmnet/" target="_blank">
          <Linkedin size={24} />
        </a>
      </Button>
      <Button variant="outline" size="icon">
        <a href="https://www.instagram.com/alexmnet/" target="_blank">
          <Instagram size={24} />
        </a>
      </Button>
    </div>
  );
}
