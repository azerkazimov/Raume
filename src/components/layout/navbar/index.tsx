"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import { ProfileButton } from "@/components/features/shared/profile-button";
import { LanguageSwitcher } from "@/components/features/shared/language-switcher";
import useMobile from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const isMobile = useMobile();

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Service", href: "/service" },
    { label: "Materials", href: "/materials" },
    { label: "Works", href: "/works" },
    { label: "Characters", href: "/characters" },
    { label: "Reviews", href: "/reviews" },
    { label: "Comments", href: "/comments" },
    { label: "About", href: "/about" },
  ];

  if (isMobile) {
    return (
      <div className="container">
        <div className="py-[26px] bg-[#212121] px-8 flex justify-start">
          <Sheet>
            <SheetTrigger>
              <Menu className="text-white" />
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="w-full flex justify-between items-center px-12">
                  <Link href="/">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={100}
                      height={100}
                      className="filter brightness-0"
                    />
                  </Link>
                  <LanguageSwitcher />
                  <ProfileButton />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 items-center">
                {navigationItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.href}
                    className="font-semibold text-black/60 hover:text-black transition-colors duration-300 uppercase tracking-wider hover:tracking-widest"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="flex mx-12 py-4">
                <Input placeholder="search" className="py-6" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#212121]">
      <div className="container flex justify-between m-auto py-[26px]">
        <div className="logo">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem className="flex">
              {navigationItems.map((item) => (
                <NavigationMenuLink
                  key={item.href}
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex gap-2">
          <Button className="rounded-full bg-white hover:bg-accent cursor-pointer w-[38px] h-[38px] flex items-center justify-center">
            <Search className="text-black" />
          </Button>
          <ProfileButton />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}
