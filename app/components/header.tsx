import Link from "next/link";
import SidebarButton from "@/app/components/sidebar-button";

export default function Header() {
  return (
    <div
      className={
        "p-3 bg-neutral-100 text-black flex justify-between items-center fixed top-0 left-0 w-screen z-20"
      }
    >
      <Link href={"/"} className={"text-xl font-bold"}>
        Chat Your Interview
      </Link>
      <SidebarButton />
    </div>
  );
}
