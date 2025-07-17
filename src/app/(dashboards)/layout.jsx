import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/custom/Sidebar";
import AdminHeader from "@/components/custom/Header";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <Sidebar />
      <div className="w-full">
        <AdminHeader />
        <div className="container mx-auto md:px-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
