'use client';

import ServerError from './components/common/ServerError';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ServerError error={error} />;
}
