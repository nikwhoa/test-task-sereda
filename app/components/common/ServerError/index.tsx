export default function ServerError({ error }: { error: Error }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-main-red text-center">
        <h1 className="text-2xl mb-4">Something went wrong!</h1>
        <p className="text-main-gray">Please try again later.</p>
      </div>
    </div>
  );
}
