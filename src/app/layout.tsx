import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/components/AuthProvider";
import { ParticleBackground } from "@/components/ParticleBackground";

export const metadata: Metadata = {
  title: "TTM AGENCY | Digital Domination",
  description: "Beyond basic web development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="dark">
        <ParticleBackground />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
