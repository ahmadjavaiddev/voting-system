import { SidebarProvider } from "@/components/ui/sidebar";
import UserSidebar from "@/components/custom/user/Sidebar";
import UserHeader from "@/components/custom/user/Header";

export default function UserLayout({ children }) {
  return (
    <SidebarProvider>
      <UserSidebar />
      <div className="w-full">
        <UserHeader />
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
