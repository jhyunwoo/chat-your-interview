import { ReactNode } from "react";

/**
 * Default layout for the app
 *
 * CSS: pt-14 w-screen h-screen
 * @param children
 * @param className
 * @constructor
 */
export default function DefaultLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`pt-14 w-screen h-screen ${className}`}>{children}</div>
  );
}
