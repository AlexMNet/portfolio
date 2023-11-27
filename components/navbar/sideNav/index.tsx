import PersonCard from './components/person-card';
import NavLinks from './components/nav-links';
import SpotifyCard from './components/spotify-card';

export default function SideNavbar() {
  return (
    <div className="animate-fade-down w-64 hidden md:block border-r bg-white dark:bg-primary-foreground">
      <div className="px-8 py-8 flex items-center justify-center flex-col">
        <PersonCard />
        <NavLinks />
        <SpotifyCard />
      </div>
    </div>
  );
}
