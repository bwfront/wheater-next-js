import type { Metadata } from "next";
import "./globals.css";
import { NavigationBar } from "./ui/root/navigation";
import { inter } from "./fonts";


export const metadata: Metadata = {
  title: "Wheater NEXT",
  description: "Generated by Bennet Witczak",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar/>
        {children}
        </body>
    </html>
  );
}
