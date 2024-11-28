import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import StoreProvider from "./StoreProvider";
import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import AppNavbar from "../components/AppNavbar";
import { Poppins } from 'next/font/google';
import { Toaster } from "../components/ui/toaster";

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "500", "600", "700", "800", "900"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        // my-40 mx-4 lg:mx-12 xl:mx-40
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${poppins.className} antialiased`}
      // className={`antialiased`}
      >
        {/* Redux store provider */}
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppNavbar />
              <AppSidebar />

              {/* <ModeToggle /> */}
              {/* my-9 mx-4 lg:mx-12 xl:mx-40 */}
              <div className="w-full px-4 my-2 lg:px-4 xl:px-4 2xl:px-2">
                {children}
              </div>

              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
