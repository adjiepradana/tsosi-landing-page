"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Download, LogOut, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const navLinks = [
    { href: "/admin", label: "Ringkasan Eksekutif", icon: LayoutDashboard },
    { href: "/admin/participants", label: "Kelola Partisipan", icon: Users },
  ];

  return (
    <header className="border-b border-brand-border bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-brand-burgundy/20">
                <Image
                  src="/images/logo.png"
                  alt="Brand Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-brand-charcoal block leading-tight">
                  The Soul of Speaking
                </span>
                <span className="text-[10px] font-bold text-brand-burgundy uppercase tracking-wider">
                  Admin Assessment Portal
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 pl-4 border-l border-brand-border/60">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-brand-rose text-brand-burgundy font-bold"
                        : "text-brand-gray hover:bg-brand-ivory hover:text-brand-charcoal"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/admin/export-csv"
              className="inline-flex items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 py-1.5 text-xs font-semibold text-brand-charcoal hover:bg-brand-ivory transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-brand-burgundy" />
              <span>Ekspor CSV</span>
            </a>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-xs text-brand-gray hover:text-red-600 gap-1.5"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
