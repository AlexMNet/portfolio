import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';

import { Github, Instagram, Linkedin } from 'lucide-react';

export default function PersonCard() {
  return (
    <div className="text-center">
      <Typography variant="h3" weight="bold">
        Alex Maldonado
      </Typography>
      <Typography variant="smallText" className="text-gray-400 text-center">
        Software Engineer
      </Typography>
      <ul role="list" className="mt-4 flex justify-center">
        <li>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com/AlexMNet" target="_blank">
              <Github />
            </a>
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://www.linkedin.com/in/alexmnet/" target="_blank">
              <Linkedin />
            </a>
          </Button>
        </li>
        <li>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://www.instagram.com/alexmnet/" target="_blank">
              <Instagram />
            </a>
          </Button>
        </li>
      </ul>
    </div>
  );
}
