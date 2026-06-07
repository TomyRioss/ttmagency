import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AuthProvider } from "@/components/AuthProvider";
import { AdminNav } from "@/components/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AuthProvider>
      <div className="admin-layout">
        <div className="admin-header">
          <div className="container">
            <h1>Panel de Administración</h1>
            <AdminNav />
          </div>
        </div>
        <div className="admin-content">
          <div className="container">{children}</div>
        </div>
      </div>
    </AuthProvider>
  );
}
