"use client";

import { usePathname } from "next/navigation";
import {
  PenBoxIcon,
  PersonStandingIcon,
  CheckCircle,
  ListChevronsUpDown,
  LogOutIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../Components/ui/sidebar";

import { cn } from "@/lib/utils";

// Menu items.
const items = [
  { title: "Products", url: "/Admin/Products", icon: PenBoxIcon },

  { title: "Orders", url: "/Admin/Orders", icon: ListChevronsUpDown },
  { title: "Home", url: "/Home", icon: LogOutIcon },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "mt-5 p-6 hover:bg-black/80 transition",
                        isActive && "bg-black/80 text-white"
                      )}
                    >
                      <a href={item.url}>
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
