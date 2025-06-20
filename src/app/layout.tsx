import { ThemeProvider } from "@/components/Themeprovider";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import "./globals.css";
import Allnav from "@/components/Navbar/Allnav";

type RootLayoutPropsType = Readonly<{
  children: ReactNode;
}>;

export const RootLayout = ({ children }: RootLayoutPropsType) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section>
            <Allnav />
          </section>
          <main className="container px-6 mx-auto">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
