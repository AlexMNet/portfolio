import { ModeToggle } from './mode-toggle';
export function Navbar() {
  return (
    <>
      {/* <div className="w-full h-4 dark:bg-slate-500 bg-black"></div> */}
      <div className="mx-auto w-full max-w-5xl py-12 px-4">
        <nav className="flex items-center justify-center sm:justify-between">
          <div className="hidden sm:block">AlexMaldonado.DEV</div>
          <div className="flex items-center space-x-3">
            <ul className="flex space-x-3">
              <li>
                <a href="">
                  <span className="text-blue-500">.00</span> Home
                </a>
              </li>
              <li>
                <a href="">
                  <span className="text-blue-500">.01</span> Work
                </a>
              </li>
              <li>
                <a href="">
                  <span className="text-blue-500">.02</span> Contact
                </a>
              </li>
            </ul>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </>
  );
}
