export default function MonthSkeleton() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <div
          className="animate-pulse rounded-lg bg-white/50 aspect-square"
          key={i}
        ></div>
      ))}
    </>
  );
}
