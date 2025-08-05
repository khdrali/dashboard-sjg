// MainLayouts.tsx
import { SidebarProvider } from "@/common/context/SidebarContext";
import LayoutContent from "./LayoutContent";

export default function MainLayouts({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
}
