"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { IMAGES } from "@/assets/images";
import { NAV_GROUPS, NAV_LINKS } from "@/config/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

        <div className="flex items-center h-16 px-5 border-b">
          <Image src={IMAGES.logo} alt="LINKey Digital" width={110} height={36} />
        </div>

        <nav className="flex flex-col py-4 gap-1">

          {/* Dropdown groups as accordion */}
          <div className="px-3">
            <Accordion type="multiple" className="w-full">
              {NAV_GROUPS.map((group) => (
                <AccordionItem key={group.title} value={group.title.toLowerCase()} className="border-none">
                  <AccordionTrigger className="text-body font-medium text-sm py-3 hover:no-underline">
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent className="pb-1">
                    <ul className="flex flex-col gap-1 pl-2">
                      {group.links.map((item) => (
                        <li key={item.title}>
                          <Link href={item.href} className="block py-2 px-3 rounded-md text-sm text-body hover:bg-gray-50 transition-colors">
                            <span className="font-medium">{item.title}</span>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Simple links */}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-sm font-medium text-body py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
            >
              {link.title}
            </Link>
          ))}

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 mt-6 pt-6 border-t px-3">
            <Button variant="gradient" size="pill">Sign Up</Button>
            <GradientOutlineButton>Login</GradientOutlineButton>
          </div>

        </nav>
      </SheetContent>
    </Sheet>
  );
}
