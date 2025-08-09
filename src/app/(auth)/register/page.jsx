"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  IdCard,
  Vote,
  Shield,
  Phone as PhoneIcon,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useActionState } from "react";
import { registerUser } from "@/actions/register";
import FaceAuthDialog from "@/components/auth/FaceAuthDialog";

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  cnic: z.string().min(5, "CNIC is required"),
  phone: z
    .string()
    .min(7, "Phone is required")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone number format"),
  faceDescriptor: z.string().min(1, "Face authentication is required"),
});

function RegisterForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [showFaceAuthDialog, setShowFaceAuthDialog] = useState(false);
  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [faceAuthCompleted, setFaceAuthCompleted] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cnic: "",
      phone: "",
      faceDescriptor: "",
    },
  });

  // useActionState for server action
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined
  );

  useEffect(() => {
    if (submitted && errorMessage === undefined) {
      router.push("/login?verifyMessage=true");
    }
  }, [submitted, errorMessage, router]);

  const handleFaceCapture = (descriptor) => {
    const descriptorString = JSON.stringify(descriptor);
    setFaceDescriptor(descriptorString);
    setFaceAuthCompleted(true);
    // Update the form value for validation
    form.setValue("faceDescriptor", descriptorString);
    form.clearErrors("faceDescriptor");
  };

  const handleSubmit = async (formData) => {
    // Validate the form before submission
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }

    if (faceDescriptor) {
      formData.append("faceDescriptor", faceDescriptor);
    }
    setSubmitted(true);
    await formAction(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Create Account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to create your account
            </CardDescription>
          </CardHeader>

          {errorMessage && (
            <div className="px-6">
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}

          <CardContent className="space-y-4">
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...form.register("name")}
                  />
                </div>
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...form.register("email")}
                  />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    {...form.register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="cnic"
                    type="text"
                    placeholder="Enter your CNIC"
                    className="pl-10"
                    {...form.register("cnic")}
                  />
                </div>
                {form.formState.errors.cnic && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.cnic.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <PhoneIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    {...form.register("phone")}
                  />
                </div>
                {form.formState.errors.phone && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>

              {/* Face Authentication Section */}
              <div className="space-y-2">
                <Label>Face Authentication *</Label>
                <div className="p-3 border rounded-lg bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      {faceAuthCompleted
                        ? "Face data captured"
                        : "Complete face authentication"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {faceAuthCompleted
                      ? "Face authentication has been set up successfully. You can now use face recognition for secure voting."
                      : "Face authentication is required for secure voting. Please capture your face data to continue."}
                  </p>
                  {!faceAuthCompleted && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowFaceAuthDialog(true)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Set Up Face Authentication
                    </Button>
                  )}
                  {faceAuthCompleted && (
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-700">
                        Ready for secure voting
                      </span>
                    </div>
                  )}
                </div>
                {form.formState.errors.faceDescriptor && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.faceDescriptor.message}
                  </p>
                )}
              </div>

              <input type="hidden" name="redirectTo" value={callbackUrl} />

              <Button
                type="submit"
                className="w-full"
                disabled={isPending || !faceAuthCompleted}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </Button>

              {!faceAuthCompleted && (
                <p className="text-sm text-amber-600 text-center mt-2">
                  Please complete face authentication to register
                </p>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Face Authentication Dialog */}
        <FaceAuthDialog
          open={showFaceAuthDialog}
          onClose={() => setShowFaceAuthDialog(false)}
          onCapture={handleFaceCapture}
        />
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
