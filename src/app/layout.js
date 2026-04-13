import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ContentApi } from "./compoments/ContentApi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Portal",
  description: "Student Portal",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ContentApi>
        {children}
        </ContentApi>
        </body>
    </html>
  );
}
