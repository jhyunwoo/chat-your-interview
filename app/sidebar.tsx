"use client";

import { useSidebar } from "@/lib/stores/sidebar";
import Link from "next/link";
import { ReactNode } from "react";

function NavButton({ href, children }: { href: string; children: ReactNode }) {
  const { toggleSidebar } = useSidebar((state) => state);
  return (
    <Link
      href={href}
      onClick={toggleSidebar}
      className={"hover:bg-neutral-800 transition-all"}
    >
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar((state) => state);

  return (
    <>
      <div
        className={`z-20 w-2/3 pt-20 h-screen fixed top-0 right-0 ${isOpen ? "translate-x-0" : "translate-x-full"} bg-neutral-950 text-white p-4 transition-all transform-gpu`}
      >
        <div
          className={
            "flex flex-col gap-2 text-xl font-semibold *:p-1 *:px-2 *:ring-2 *:ring-neutral-50 *:rounded-lg"
          }
        >
          <NavButton href={"/"}>Home</NavButton>
          <NavButton href={"/interview"}>Interview</NavButton>
          <NavButton href={"/profile"}>Profile</NavButton>
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className={`w-screen h-screen fixed top-0 left-0 z-10 bg-neutral-800/50 ${isOpen ? "" : "hidden"}`}
      />
    </>
  );
}
