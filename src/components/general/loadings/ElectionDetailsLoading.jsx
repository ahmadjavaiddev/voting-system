import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ElectionDetailsLoading() {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-5xl">
      {/* Back button skeleton */}
      <Skeleton className="h-9 w-32 mb-4" />

      {/* Election header skeleton */}
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-64 md:h-10 md:w-80" />
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 md:mt-0">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column - Election details */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-5 w-full" />
              </div>
              <Skeleton className="h-px w-full" />
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex items-start gap-2">
                    <Skeleton className="h-4 w-4 mt-0.5" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help section skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Voting interface and candidate details */}
        <div className="md:col-span-2">
          {/* Details Area */}
          <Card className="mb-4">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          {/* Voting section skeleton */}
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64 mt-1" />
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Candidate 1 skeleton */}
                <div className="relative rounded-lg border p-4">
                  <Skeleton className="absolute right-4 top-4 h-4 w-4 rounded-full" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-5 w-40" />
                    </div>
                    <Skeleton className="h-4 w-56" />
                    <div>
                      <Skeleton className="h-3 w-24 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div>
                      <Skeleton className="h-3 w-24 mb-2" />
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidate 2 skeleton */}
                <div className="relative rounded-lg border p-4">
                  <Skeleton className="absolute right-4 top-4 h-4 w-4 rounded-full" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <Skeleton className="h-5 w-36" />
                    </div>
                    <Skeleton className="h-4 w-48" />
                    <div>
                      <Skeleton className="h-3 w-24 mb-2" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div>
                      <Skeleton className="h-3 w-24 mb-2" />
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-start gap-2">
                          <Skeleton className="h-3 w-3 mt-0.5" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
