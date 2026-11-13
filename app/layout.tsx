import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexPlay — Play without waiting",
  description: "Discover games and start playing with NexPlay.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
