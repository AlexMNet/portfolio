export default function MessageSkeleton({ count }: { count: number }) {
  return Array(count)
    .fill(true)
    .map((_, i) => (
      <div
        key={i}
        className="animate-pulse p-2 dark:bg-neutral-900 bg-gray-200 rounded-md max-w-lg my-4 h-14 space-y-4"
      >
        <div className="w-1/3 h-3 dark:bg-neutral-700 bg-gray-400 rounded-md"></div>
        <div className="w-4/5 h-3 dark:bg-neutral-700 bg-gray-400 rounded-md"></div>
      </div>
    ));
}
