import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import ConvexClientProviders from "@/providers/ConvexClientProviders";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Seamless Real-Time Chat - Connect, Communicate, Collaborate",
  description:
    "Experience fast and secure messaging with our intuitive chat application. Stay connected with friends and colleagues through real-time chat, voice, and video calls, all in one easy-to-use platform.",
  // icons : '/favicon.ico'
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProviders>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster  richColors/>
          </ConvexClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
