'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface SafePortalProps {
  children: React.ReactNode;
}

export default function SafePortal({ children }: SafePortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
} 