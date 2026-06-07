"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { FolderOpen, MessageSquare, Zap, LogOut } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "Proyectos", icon: FolderOpen },
  { href: "/admin/testimonials", label: "Testimonios", icon: MessageSquare },
  { href: "/admin/skills", label: "Habilidades", icon: Zap },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div
      className="admin-nav"
      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
    >
      <div style={{ display: "flex", gap: "var(--space-sm)" }}>
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <link.icon size={15} />
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: "flex", gap: "var(--space-sm)", alignItems: "center" }}>
        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            color: "var(--color-text-secondary)",
            padding: "0.4rem 1rem",
          }}
        >
          Ver web
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="btn btn-small btn-secondary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
        >
          <LogOut size={14} />
          Salir
        </button>
      </div>
    </div>
  );
}
