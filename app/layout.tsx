import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import StoreProvider from "./StoreProvider";
import { SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
// import AppNavbar from "../components/AppNavbar";
import { Playfair_Display, Poppins } from "next/font/google";
import { Toaster } from "../components/ui/toaster";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

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
  title: "Kape Ibarra POS",
  description: "Created using NextJS, ExpressJS & Postgresql",
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
        className={`${poppins.className} ${playfairDisplay.style} antialiased`}
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
              <AppSidebar />

              {/* <ModeToggle /> */}
              {/* my-9 mx-4 lg:mx-12 xl:mx-40 */}
              {/* my-[calc(56px+12px)] */}
              {/* my-[calc(72px+12px)] */}
              {/* md:my-2 */}
              <div className="grid relative w-full">
                <AppNavbar />

                <div className="w-full mt-2 lg:mt-12 mb-32 px-4 lg:px-8 xl:px-12 2xl:px-36">
                  {children}
                </div>
                <Footer />
              </div>

              <Toaster />
            </SidebarProvider>
          </ThemeProvider>
        </StoreProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
