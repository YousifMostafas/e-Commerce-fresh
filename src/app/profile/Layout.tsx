import Link from "next/link";
import { UserCircle } from "lucide-react";
import ProfileSidebar from "./addresses/ProfileSidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-linear-to-br from-main-color via-[#22C55E] to-[#4ADE80] text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-5 flex items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="font-medium text-white">My Account</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
              <UserCircle className="size-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Account</h1>
              <p className="mt-1 text-white/80">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="shrink-0 lg:sticky lg:top-24 lg:w-80">
            <ProfileSidebar />
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}