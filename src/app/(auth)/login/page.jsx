"use client";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { authenticate } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form action={formAction} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full border rounded px-3 py-2"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
