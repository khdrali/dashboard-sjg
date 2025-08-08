import { useSidebar } from "@/common/context/SidebarContext";
import React from "react";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[250px]"
    : "lg:ml-[90px]";

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      {/* Sidebar and Backdrop */}
      <AppSidebar />
      <Backdrop />

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ease-in-out ${mainContentMargin} flex flex-col flex-1`}
      >
        {/* Header */}
        <AppHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 mx-auto max-w-screen-2xl md:p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
