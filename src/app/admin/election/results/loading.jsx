import ElectionResultsSkeleton from "@/components/general/loadings/ElectionResultsSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      <ElectionResultsSkeleton />
    </div>
  );
}