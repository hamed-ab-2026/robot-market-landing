/**
 * Route-level loading UI shown by Next.js while the page's data
 * (and lazy-loaded below-the-fold components) are being prepared.
 */
export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-light border-t-primary" />
    </div>
  );
}
