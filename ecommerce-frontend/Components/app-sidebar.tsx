import {
  PenBox,
  ChevronDown,
  PersonStandingIcon,
  CheckCircle,
  ListChevronsUpDown,
  LogOutIcon,
  PenBoxIcon,
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

// Menu items.
const items = [
  {
    title: "Users",
    url: "/Admin/Users",
    icon: PersonStandingIcon,
  },
  {
    title: "Products",
    url: "/Admin/Products",
    icon: PenBoxIcon,
  },
  {
    title: "Transactions",
    url: "/Admin/Transactions",
    icon: CheckCircle,
  },
  {
    title: "Orders",
    url: "#",
    icon: ListChevronsUpDown,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOutIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="mt-5 p-6">
                    <a href={item.url}>
                      <item.icon className="h-6 w-6" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
