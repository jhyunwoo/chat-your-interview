"use client";

import { useSidebar } from "@/lib/stores/sidebar";
import Link from "next/link";
import { ReactNode } from "react";

function NavButton({ href, children }: { href: string; children: ReactNode }) {
  const { toggleSidebar } = useSidebar((state) => state);
  return (
    <Link href={href} onClick={toggleSidebar}>
      {children}
    </Link>
  );
}

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebar((state) => state);

  return (
    <>
      <div
        className={`z-10 w-2/3 pt-20 h-screen fixed top-0 right-0 ${isOpen ? "translate-x-0" : "translate-x-full"} bg-white p-4 transition-all transform-gpu`}
      >
        <div className={"flex flex-col gap-2"}>
          <NavButton href={"/"}>Home</NavButton>
          <NavButton href={"/interview"}>Interview</NavButton>
          <NavButton href={"/profile"}>Profile</NavButton>
        </div>
      </div>
      <div
        onClick={toggleSidebar}
        className={`w-screen h-screen fixed top-0 left-0 bg-neutral-500/50 ${isOpen ? "" : "hidden"}`}
      />
    </>
  );
}
