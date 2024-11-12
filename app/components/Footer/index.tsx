import Logo from '../common/Logo';
import { NAVIGATION_LINKS } from '@/app/lib/constants';
import { NavigationLink } from '@/app/lib/types';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col justify-center items-center gap-5">
      <Logo className="text-3xl text-center" />
      <div className="flex flex-row justify-center items-center gap-12 text-main-text font-light">
        {NAVIGATION_LINKS.map((link: NavigationLink) => (
          <a href={link.href} className="hover:text-main-red" key={link.label}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="text-center text-sm text-main-gray font-light">© {currentYear} All rights reserved</div>
    </footer>
  );
}
