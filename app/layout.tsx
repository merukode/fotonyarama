import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Lora } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import VinylPlayer from "./components/VinylPlayer"
import Navbar from "./components/Navbar"

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const lora = Lora({ subsets: ["latin"], variable: "--font-body" })

export const metadata: Metadata = {
  title: "Fotonyarama",
  description: "Shooting whatever looks mildly interesting.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${lora.variable} font-body antialiased bg-white text-black`}>
        <VinylPlayer/>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
