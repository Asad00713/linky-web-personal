import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { NAV_GROUPS, NAV_LINKS } from "@/config/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { GradientOutlineButton } from "@/components/shared/GradientOutlineButton";
import { MobileNav } from "./MobileNav";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-[0_2px_8px_0_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between h-16 md:h-20 px-[5%] max-w-max-width mx-auto">

        <Link href="/" className="shrink-0">
          <Image src={IMAGES.logo} alt="LINKey Digital" width={130} height={44} />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">

              {NAV_GROUPS.map((group) => (
                <NavigationMenuItem key={group.title}>
                  <NavigationMenuTrigger className="text-body font-medium text-sm">
                    {group.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-100 gap-2 p-4">
                      {group.links.map((item) => (
                        <NavDropdownItem key={item.title} href={item.href} title={item.title}>
                          {item.description}
                        </NavDropdownItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              {NAV_LINKS.map((link) => (
                <NavigationMenuItem key={link.title}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={link.href} className="text-body font-medium text-sm">
                      {link.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* CTA + Mobile trigger */}
        <div className="flex items-center gap-3">
          <GradientOutlineButton className="hidden md:inline-flex">Login</GradientOutlineButton>
          <Button variant="gradient" size="pill" className="hidden md:inline-flex">Sign Up</Button>
          <MobileNav />
        </div>

      </div>
    </header>
  );
}

function NavDropdownItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className="block p-3 rounded-md hover:bg-gray-50 transition-colors">
          <p className="text-sm font-medium text-body leading-none">{title}</p>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
