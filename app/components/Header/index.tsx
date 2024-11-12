import Logo from '../common/Logo';
import { NAVIGATION_LINKS } from '@/app/lib/constants';
import { NavigationLink } from '@/app/lib/types';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center border-b border-[#FF4E6B29] h-[70px]">
      <Logo className="flex items-center text-2xl h-full" />
      <nav className="flex flex-row justify-center items-center gap-12 text-xl font-light h-full">
        {NAVIGATION_LINKS.map((link: NavigationLink) => (
          <a
            href={link.href}
            key={link.label}
            className={`flex items-center h-full border-b-[1px] hover:border-main-red transition-colors ${link.label === 'Calendar' ? 'border-main-red' : 'border-transparent'}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
