"use client";

import { AppSidebar } from "@/Components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { useUser } from "@/store/user-store";
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, role } = useUser();
  console.log(userId, role);
  const router = useRouter();

  // useEffect(() => {
  //   if (!userId || role === "customer") {
  //     router.push("/");
  //   }
  // }, []);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  min-h-full   bg-white antialiased `}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <div className=" px-8 py-4">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
