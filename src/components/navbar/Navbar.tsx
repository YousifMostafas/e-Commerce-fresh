"use client";

import React, { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import { Headset, Heart, LogOut, Search, ShoppingCart, User, UserCircle, UserPlus } from "lucide-react";
import Image from "next/image";
import img from "@/assets/images/freshcart-logo.svg";
import { Input } from "@base-ui/react";
import { signOut, useSession } from "next-auth/react";
import AppButton from "../AppButton/AppButton";
import { WishlistCounterProvider } from "@/Context/WishlistContext";
import { CartCounterProvider } from "@/Context/CartCount";
import UserMenu from "./UserMenu";
import MobileMenu from "./Mobilemenu";

export default function Navbar() {
  const {count}= useContext(CartCounterProvider)
  const {wishcount} =useContext(WishlistCounterProvider)
  const { data } = useSession();
  function handleLogout() {
    signOut(
      {
        redirectTo: "/login",
      }
    )
  }
  return (
    <>
      <div className="hidden lg:block text-sm border-b border-gray-100  bg-white ">
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center h-10">
        <div className="flex items-center gap-6 text-gray-500">
          <span className="flex items-center gap-2">
            <svg
              data-prefix="fas"
              data-icon="truck"
              className="svg-inline--fa fa-truck text-main-color size-3"
              role="img"
              viewBox="0 0 576 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M0 96C0 60.7 28.7 32 64 32l288 0c35.3 0 64 28.7 64 64l0 32 50.7 0c17 0 33.3 6.7 45.3 18.7L557.3 192c12 12 18.7 28.3 18.7 45.3L576 384c0 35.3-28.7 64-64 64l-3.3 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64l-102.6 0c-10.4 36.9-44.4 64-84.7 64s-74.2-27.1-84.7-64L64 448c-35.3 0-64-28.7-64-64L0 96zM512 288l0-50.7-45.3-45.3-50.7 0 0 96 96 0zM192 424a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm232 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
              />
            </svg>
            <span className="font-medium ">Free Shipping on Orders 500 EGP</span>
          </span>
          <span className="flex items-center gap-2">
            <svg
              data-prefix="fas"
              data-icon="gift"
              className="svg-inline--fa fa-gift text-main-color size-3"
              role="img"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M321.5 68.8C329.1 55.9 342.9 48 357.8 48l2.2 0c22.1 0 40 17.9 40 40s-17.9 40-40 40l-73.3 0 34.8-59.2zm-131 0l34.8 59.2-73.3 0c-22.1 0-40-17.9-40-40s17.9-40 40-40l2.2 0c14.9 0 28.8 7.9 36.3 20.8zm89.6-24.3l-24.1 41-24.1-41C215.7 16.9 186.1 0 154.2 0L152 0c-48.6 0-88 39.4-88 88 0 14.4 3.5 28 9.6 40L32 128c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l448 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-41.6 0c6.1-12 9.6-25.6 9.6-40 0-48.6-39.4-88-88-88l-2.2 0c-31.9 0-61.5 16.9-77.7 44.4zM480 272l-200 0 0 208 136 0c35.3 0 64-28.7 64-64l0-144zm-248 0l-200 0 0 144c0 35.3 28.7 64 64 64l136 0 0-208z"
              />
            </svg>
            <span className="font-medium ">New Arrivals Daily</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-gray-500">
            <a
              href="tel:+18001234567"
              className="flex items-center gap-1.5 hover:text-main-color transition-colors"
            >
              <svg
                data-prefix="fas"
                data-icon="phone"
                className="svg-inline--fa size-3 fa-phone text-xs"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z"
                />
              </svg>
              <span className="font-medium  duration-200 transition-all">+1 (800) 123-4567</span>
            </a>
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-1.5 hover:text-main-color transition-colors"
            >
              <svg
                data-prefix="far"
                data-icon="envelope"
                className="svg-inline--fa size-3  duration-200 fa-envelope text-xs"
                role="img"
                viewBox="0 0 512 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z"
                />
              </svg>
              <span className="font-medium  duration-200 transition-all">support@freshcart.com</span>
            </a>
          </div>
          <span className="h-4 bg-gray-200 ]" />
          <div className="flex items-center gap-4">
           
           {data ?  
           
            <Link
              className="flex items-center gap-1.5 group text-gray-600  group-hover:text-main-color duration-200 transition-colors whitespace-nowrap"
              href="/profile"
            >
              <svg
                data-prefix="far"
                data-icon="user"
                className="svg-inline--fa group-hover:text-main-color duration-200 transition-all size-3.5 fa-user "
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"
                />
              </svg>
              
              <span className="font-medium group-hover:text-main-color  duration-200 transition-all">{data.user?.name}</span>
            </Link>
           :  
            <Link
              className="flex items-center gap-1.5 text-gray-600 group duration-200 transition-colors whitespace-nowrap"
              href="/login"
            >
              <svg
                data-prefix="far"
                data-icon="user"
                className="svg-inline--fa size-3.5 fa-user "
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"
                />
              </svg>
              
              <span className="font-medium group-hover:text-main-color duration-200 transition-all">Sign In</span>
            </Link>}
          {data ? 
            <div
              className="flex items-center gap-1.5 cursor-pointer text-gray-600 group duration-200 transition-colors whitespace-nowrap"
              onClick={handleLogout}
            >
         <LogOut className="size-4 group-hover:text-main-color duration-200 text-gray-600" />
              <span className="font-medium group-hover:text-main-color duration-200 transition-all"> Log Out</span>
            </div>
          
          :
            <Link
              className="flex items-center gap-1.5 text-gray-600 group duration-200 transition-colors whitespace-nowrap"
              href="/register"
            >
         <UserPlus className="size-4 group-hover:fill-main-color duration-200 fill-gray-600" />
              <span className="font-medium group-hover:text-main-color duration-200 transition-all">Sign Up</span>
            </Link>
          }
          
          </div>
        </div>
      </div>
    </div>
  </div>
   <header className=" sticky top-0 z-50 bg-white shadow p-4 w-full">
  

  <nav className=" bg-white shadow ">
    <NavigationMenu className="max-w-none flex w-full gap-10 items-center">
      <div>
        <Image src={img} alt="logo" />
      </div>

  <div className="relative hidden grow md:block">
  <Input
    className="w-full rounded-4xl p-2 px-3.5 pr-14 focus:outline-main-color/50"
    placeholder="Search for products, brands and more..."
  />
  <button
    type="button"
    aria-label="Search"
    className="absolute right-1.5 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-main-color text-white transition-colors hover:bg-[#15803D]"
  >
    <Search className="size-4" />
  </button>
</div>

      <NavigationMenuList className="justify-end">
        {/* Mobile Menu */}
   <MobileMenu />
        {/* Desktop Menu */}
        <NavigationMenuItem className="hidden md:flex gap-5">
          <NavigationMenuList>
            <NavigationMenuItem className="flex items-center gap-2.5">
              <NavigationMenuLink
                render={
                  <Link
                    className="hover:text-main-color duration-300 transition-all text-[16px] font-medium text-[#364153]"
                    href="/"
                  >
                    Home
                  </Link>
                }
              />
              <NavigationMenuLink
                render={
                  <Link
                    className="hover:text-main-color duration-300 transition-all text-[16px] font-medium text-[#364153]"
                    href="/shop"
                  >
                    Shop
                  </Link>
                }
              />

              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-main-color duration-300 transition-all text-base font-medium text-[#364153]">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent className="border-white">
                  <ul className="p-4 pr-20">
                    <li className="py-2 hover:text-main-color text-[#364153]/80 font-medium duration-300 transition-all">
                      <Link href={"/category"}>All Categories</Link>
                    </li>
               <li className="py-2.5 hover:text-main-color duration-300 text-[#364153]/80 font-medium transition-all">
<Link href="/shop?category=6439d2d167d9aa4ca970649f">Electronics</Link></li>
<li className="py-2.5 hover:text-main-color duration-300 text-[#364153]/80 font-medium transition-all">
  <Link href="/shop?category=6439d58a0049ad0b52b9003f">Women's Fashion</Link>
</li>
<li className="py-2.5 hover:text-main-color duration-300 text-[#364153]/80 font-medium transition-all">
  <Link href="/shop?category=6439d5b90049ad0b52b90048">Men's Fashion</Link>
</li>
<li className="py-2.5 hover:text-main-color duration-300 text-[#364153]/80 font-medium transition-all">
  <Link href="/shop?category=6439d30b67d9aa4ca97064b1">Beauty & Health</Link>
</li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuLink
                render={
                  <Link
                    className="hover:text-main-color duration-300 transition-all text-[16px] font-medium text-[#364153]"
                    href="/brands"
                  >
                    Brands
                  </Link>
                }
              />
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Support / Help section */}
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                render={
                  <Link href="/wishlist">
                    <div className="flex gap-3 items-center">
                      <div className="p-2 bg-[#E8F8EE] rounded-full text-main-color">
                        <Headset className="size-4 font-bold" />
                      </div>
                      <div className="whitespace-nowrap">
                        <p className="text-xs text-[#99A1AF] font-medium">
                          Support
                        </p>
                        <p className="text-xs leading-4 text-[#364153] font-semibold flex gap-1">
                          <span>24/7</span>
                          <span>Help</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                }
              />
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* User Action Icons */}
          <NavigationMenuList>
            <NavigationMenuItem className="flex gap-2 border-l-2 border-[#E5E7EB] pl-3 items-center">
              <NavigationMenuLink
                render={
     <Link href="/wishlist" className="relative block">
  <Heart className="size-6 text-[#6A7282] hover:text-main-color duration-300 transition-all" />
  {wishcount > 0 && (
    <span className="absolute -top-2 -right-2 size-4.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
      {wishcount}
    </span>
  )}
</Link>
                }
              />
              <NavigationMenuLink
            render={
  <Link href="/cart" className="relative block">
    <ShoppingCart className="size-6 text-[#6A7282] hover:text-main-color duration-300 transition-all" />
{count ?     <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-main-color text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
     {count}
    </span>: ""}
  </Link>
}
              />
            {data ? (
  <UserMenu />
) : (
                <Link href="/login">
                  <AppButton className="btn bg-main-color rounded-3xl p-5 text-sm text-white hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap">
                  <User /> Sign In
                </AppButton>
                </Link>
              
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
</header>
    </>
  );
}
