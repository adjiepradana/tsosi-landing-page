import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Soul Blueprint™ | The Soul of Speaking Indonesia",
  description:
    "Understand Your Patterns. Transform the Way You Communicate. Conflict Pattern Self-Assessment oleh The Soul of Speaking Indonesia.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
