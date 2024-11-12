import { LogoProps } from '@/app/lib/types';

export default function Logo({ className }: LogoProps): JSX.Element {
  return <div className={`logo uppercase ${className}`}>logo</div>;
}
