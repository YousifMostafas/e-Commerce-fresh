"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { ChevronRight, LogOut, MapPin, Settings } from "lucide-react";

const items = [
  { href: "/profile/addresses", label: "My Addresses", Icon: MapPin },
  { href: "/profile/settings", label: "Settings", Icon: Settings },
];

export default function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="  font-bold border-gray-100 p-2">
      My Account

      </div>

      {/* links */}
      <nav className="space-y-1 p-3">
        {items.map(({ href, label, Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-4 rounded-xl p-3 transition ${
                active
                  ? "bg-emerald-50 text-main-color"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span
                className={`flex size-11 items-center justify-center rounded-xl transition ${
                  active
                    ? "bg-main-color text-white shadow-md"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                <Icon className="size-4" />
              </span>
              <span className="flex-1 font-medium">{label}</span>
              <ChevronRight className="size-4" />
            </Link>
          );
        })}
      </nav>

 
    </div>
  );
}