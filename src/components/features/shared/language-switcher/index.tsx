"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useMobile from "@/hooks/use-mobile";
import { defaultLocale, Locale } from "@/i18n/locales";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useCallback } from "react";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const isMobile = useMobile();

  const handleLanguageChange = useCallback(
    (value: Locale) => {
      router.push(pathname, { locale: value });
    },
    [pathname, router]
  );

  return (
    <Select
      value={currentLocale}
      onValueChange={handleLanguageChange}
      defaultValue={defaultLocale}
    >
      <SelectTrigger className={isMobile ? "text-black/70" : "bg-black text-white"}>
        {isMobile ? "" : <SelectValue placeholder="Select a language" />}
        <Globe />
      </SelectTrigger>
      <SelectContent className={isMobile ? "text-black/70" : "bg-black text-white"}>
        <SelectItem value="en" className={isMobile ? "text-black/70" : "text-white"}>
          English
        </SelectItem>
        <SelectItem value="ru" className={isMobile ? "text-black/70" : "text-white"}>
          Русский
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
