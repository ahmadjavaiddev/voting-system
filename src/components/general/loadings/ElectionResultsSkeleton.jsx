"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ElectionResultsSkeleton() {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-7xl">
      {/* Back button skeleton */}
      <Skeleton className="h-9 w-32 mb-4" />

      {/* Page header skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48 md:h-10 md:w-64" />
        <Skeleton className="h-4 w-80 mt-1" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Elections List Skeleton */}
        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="h-6 w-32 mb-2" />

          {/* Live election cards skeleton */}
          {[1, 2].map((index) => (
            <Card key={index} className="border">
              <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-12 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mt-1" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex justify-between text-sm mb-2">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between text-xs mt-1">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Election Details Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Skeleton className="h-6 w-64" />
                  <Skeleton className="h-4 w-full mt-1" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Election Stats Skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded-lg">
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-6 w-12" />
                  </div>
                ))}
              </div>

              {/* Results Visualization Skeleton */}
              <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-6">
                  {[1, 2, 3].map((index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded-full" />
                          <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-12" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <Skeleton className="h-5 w-40 rounded-full" />
                        </div>
                        <Skeleton className="h-6 w-full rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voting Timeline Skeleton */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-9 w-32" />
                </div>

                <div className="h-[200px] w-full">
                  <div className="flex h-full items-end gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center flex-1"
                      >
                        <Skeleton
                          className="w-full rounded-t"
                          style={{
                            height: `${Math.random() * 100 + 50}px`,
                          }}
                        />
                        <Skeleton className="h-3 w-8 mt-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Election Information Skeleton */}
              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-5 w-40" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <div key={index}>
                      <Skeleton className="h-4 w-20 mb-1" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
