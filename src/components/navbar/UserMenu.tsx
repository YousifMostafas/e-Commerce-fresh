"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  User,
  UserCircle,
} from "lucide-react";

const links = [
  { href: "/profile", label: "My Profile", Icon: User },
  { href: "/order", label: "My Orders", Icon: Package },
  { href: "/wishlist", label: "My Wishlist", Icon: Heart },
  { href: "/addresses", label: "Addresses", Icon: MapPin },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export default function UserMenu() {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="User menu"
        aria-expanded={open}
      >
        <UserCircle
          className={`size-6 duration-300 transition-all mt-2 mx-2 hover:text-main-color ${
            open ? "text-main-color" : "text-[#6A7282]"
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-4 w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="flex items-center gap-3 border-b border-gray-100 p-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-main-color">
              <UserCircle className="size-6" />
            </div>
            <span className="font-semibold text-gray-900">
              {data?.user?.name}
            </span>
          </div>

          <div className="py-2">
            {links.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-5 py-3 text-gray-600 transition hover:bg-gray-50 hover:text-main-color"
              >
                <Icon className="size-4 text-gray-400" />
                {label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              type="button"
              onClick={() => signOut({ redirectTo: "/login" })}
              className="flex w-full items-center gap-4 px-5 py-3 text-red-500 transition hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}