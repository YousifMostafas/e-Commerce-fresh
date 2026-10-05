"use client";

import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  Headset,
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  UserPlus,
  X,
} from "lucide-react";
import img from "@/assets/images/freshcart-logo.svg";
import { CartCounterProvider } from "@/Context/CartCount";
import { WishlistCounterProvider } from "@/Context/WishlistContext";


const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/category" },
  { label: "Brands", href: "/brands" },
];
export default function MobileMenu() {
  const { count } = useContext(CartCounterProvider);
  const { wishcount } = useContext(WishlistCounterProvider);
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const close = () => setOpen(false);

  // lock page scroll while the sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "block px-6 py-3 text-lg font-medium text-[#364153] transition hover:text-main-color";

  return (
    <>
      {/* Header icons + hamburger (small screens only) */}
      <div className="ml-auto flex items-center gap-5 md:hidden">
        <Link href="/wishlist" aria-label="Wishlist" className="relative block">
          <Heart className="size-6 text-[#6A7282]" />
          {wishcount > 0 && (
            <span className="absolute -top-2 -right-2 flex size-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white">
              {wishcount}
            </span>
          )}
        </Link>

        <Link href="/cart" aria-label="Cart" className="relative block">
          <ShoppingCart className="size-6 text-[#6A7282]" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 flex size-4.5 items-center justify-center rounded-full bg-main-color text-[10px] font-bold text-white ring-2 ring-white">
              {count}
            </span>
          )}
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex size-12 items-center justify-center rounded-full bg-main-color text-white"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-100 md:hidden">
            {/* overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={close} />

            {/* sidebar */}
            <aside className="absolute right-0 top-0 flex h-full w-80 max-w-[85%] flex-col overflow-y-auto bg-white shadow-xl">
              {/* top: logo + close */}
              <div className="flex items-center justify-between border-b border-gray-100 p-5">
                <Image src={img} alt="FreshCart" className="h-8 w-auto" />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close menu"
                  className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* search */}
              <div className="border-b border-gray-100 p-5">
                <div className="relative">
                  <input
                    placeholder="Search products..."
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-4 pr-14 text-sm focus:outline-main-color/50"
                  />
                  <button
                    type="button"
                    aria-label="Search"
                    className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg bg-main-color text-white"
                  >
                    <Search className="size-4" />
                  </button>
                </div>
              </div>

              {/* main links */}
             <nav className="border-b border-gray-100 py-3">
  {mainLinks.map((l) => (
    <Link
      key={l.href}
      href={l.href}
      onClick={close}
      className={linkClass}
    >
      {l.label}
    </Link>
  ))}
</nav>

              {/* wishlist + cart */}
              <div className="space-y-1 border-b border-gray-100 p-3">
                <Link
                  href="/wishlist"
                  onClick={close}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-gray-50"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                    <Heart className="size-4" />
                  </span>
                  <span className="flex-1 font-medium text-[#364153]">
                    Wishlist
                  </span>
                  {wishcount > 0 && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                      {wishcount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/cart"
                  onClick={close}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-gray-50"
                >
                  <span className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-main-color">
                    <ShoppingCart className="size-4" />
                  </span>
                  <span className="flex-1 font-medium text-[#364153]">
                    Cart
                  </span>
                  {count > 0 && (
                    <span className="flex size-6 items-center justify-center rounded-full bg-main-color text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
              </div>

              {/* user + sign out */}
              {data ? (
                <div className="space-y-1 border-b border-gray-100 p-3">
                  <Link
                    href="/profile"
                    onClick={close}
                    className="flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-gray-50"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                      <User className="size-4" />
                    </span>
                    <span className="font-medium text-[#364153]">
                      {data.user?.name}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => signOut({ redirectTo: "/login" })}
                    className="flex w-full items-center gap-4 rounded-xl px-3 py-3 text-left hover:bg-red-50"
                  >
                    <span className="flex size-10 items-center justify-center rounded-full bg-red-50 text-red-500">
                      <LogOut className="size-4" />
                    </span>
                    <span className="font-medium text-red-500">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex gap-3 border-b border-gray-100 p-5">
                  <Link
                    href="/login"
                    onClick={close}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-main-color py-3 font-semibold text-white"
                  >
                    <User className="size-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={close}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 font-semibold text-gray-700"
                  >
                    <UserPlus className="size-4" />
                    Sign Up
                  </Link>
                </div>
              )}

              {/* help card */}
              <div className="mt-auto p-5">
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-emerald-100 text-main-color">
                    <Headset className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#364153]">
                      Need Help?
                    </p>
                    <Link
                      href="/contact"
                      onClick={close}
                      className="text-sm font-medium text-main-color hover:text-[#15803D]"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>,
          document.body,
        )}
    </>
  );
}