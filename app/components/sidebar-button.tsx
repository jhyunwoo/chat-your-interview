"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { useSidebar } from "@/lib/stores/sidebar";

export default function SidebarButton() {
  const { toggleSidebar } = useSidebar((state) => state);
  return (
    <button type={"button"} onClick={toggleSidebar}>
      <Bars3Icon className={"size-8"} />
    </button>
  );
}
