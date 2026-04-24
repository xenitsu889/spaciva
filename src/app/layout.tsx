import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPACIVA — Technology & Marketing",
  description:
    "We help startups and businesses scale through powerful marketing strategies and cutting-edge technology. Digital Marketing, Web Development, Branding & more.",
  keywords: [
    "digital marketing",
    "web development",
    "branding",
    "SEO",
    "performance marketing",
    "Ahmedabad",
    "SPACIVA",
  ],
  openGraph: {
    title: "SPACIVA — Technology & Marketing",
    description:
      "We help startups and businesses scale through powerful marketing strategies and cutting-edge technology.",
    url: "https://vortexatechnolabs.tech",
    siteName: "SPACIVA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
