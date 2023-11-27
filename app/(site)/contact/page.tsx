import { Typography } from '@/components/ui/typography';
import Guestbook from './components/guestbook';

export default function Contact() {
  return (
    <div className="animate-fade-up max-w-7xl w-full mx-auto px-6 ">
      <div className="">
        <Typography
          variant="h3"
          weight="bold"
          className="mt-2 tracking-tighter underline text-docoration-thick decoration-double decoration-gray-400"
        >
          Contact
        </Typography>
      </div>
      <div className="mt-12 flex gap-12 flex-col lg:flex-row">
        <Guestbook />
      </div>
    </div>
  );
}
