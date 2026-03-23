"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

type SidebarItem = {
  label: string;
  icon?: any;
  onClick?: () => void;
};

type SidebarProps = {
  items?: SidebarItem[];
};

export default function Sidebar({ items = [] }: SidebarProps) {
  const router = useRouter();
  const hasPropertySection = items.length > 0;

  return (
    <aside className="w-64 bg-night h-screen sticky top-0 flex flex-col px-6 py-6">
      {/* BRAND */}
      <div
        className="flex items-center gap-2 mb-8 cursor-pointer"
        onClick={() => router.push("/properties")}
      >
        <h1 className="text-xl font-extrabold text-cream-bg">Kiri</h1>
        <img src="/logo.png" alt="logo" className="w-5 h-5" />
      </div>

      <button
        onClick={() => router.push("/properties")}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cream-bg bg-white/20 hover:bg-white/30 transition-colors mb-6"
      >
        <Home className="w-4 h-4" />
        <span>All Properties</span>
      </button>

      {hasPropertySection && (
        <>
          <div className="h-px bg-brown-muted/30 mb-6" />

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-cream-bg bg-white/10 mb-4">
            <Home className="w-4 h-4" />
            <span>This Property</span>
          </button>

          <div className="flex flex-1">
            <div className="w-px bg-brown-muted/25 mr-4 ml-2" />

            <nav className="flex flex-col gap-4">
              {items.map(({ label, icon: Icon, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center gap-3 text-sm text-brown-muted hover:text-cream-bg transition-colors"
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </>
      )}

      <div className="mt-auto pt-6 border-t border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brown-mid" />
        <div>
          <p className="text-sm font-semibold text-cream-bg">Ion Popescu</p>
          <p className="text-xs text-brown-muted">Landlord</p>
        </div>
      </div>
    </aside>
  );
}
