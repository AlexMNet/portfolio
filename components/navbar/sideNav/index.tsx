import PersonCard from './components/person-card';
import NavLinks from './components/nav-links';
import SpotifyCard from './components/spotify-card';

export default function SideNavbar() {
  return (
    <div className="w-[350-px] hidden md:block">
      <div className="h-full w-full rounded-md overflow-hidden border-r">
        <div className="px-8 py-8 flex items-center justify-center flex-col">
          <PersonCard />
          <NavLinks />
          <SpotifyCard />
        </div>
      </div>
    </div>
  );
}
