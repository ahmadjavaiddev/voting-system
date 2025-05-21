import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const BackButton = ({ url }) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      size="sm"
      className="mb-4 flex items-center gap-1 text-muted-foreground"
      onClick={() => router.push(url)}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to Dashboard
    </Button>
  );
};

export default BackButton;
