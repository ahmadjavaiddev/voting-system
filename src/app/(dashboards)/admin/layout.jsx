import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/custom/admin/Sidebar";
import AdminHeader from "@/components/custom/admin/Header";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="w-full">
        <AdminHeader />
        <div className="container mx-auto px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
