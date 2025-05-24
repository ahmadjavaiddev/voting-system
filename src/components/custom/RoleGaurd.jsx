import { auth } from "@/auth";

export default async function RoleGuard({
  children,
  allowedRoles,
  redirect = false,
  message,
}) {
  const { user } = await auth();

  if (redirect && (!user || !allowedRoles.includes(user?.role))) {
    return (
      <div className="min-h-screen flex justify-center items-center p-4 text-xl text-center">
        {message ? message : "You do not have permission to access this page."}
      </div>
    );
  }

  if (user && allowedRoles.includes(user?.role)) {
    return <>{children}</>;
  }
}
