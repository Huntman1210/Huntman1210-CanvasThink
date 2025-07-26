import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CanvasThink - The Joyful Exchange",
  description:
    "Where Help Pays Off, and Humanity Thrives. Discover products with stories, connect with helpers who care, and experience commerce that celebrates human connection.",
  keywords: "joyful commerce, human connection, community marketplace, helper stories, meaningful shopping",
  authors: [{ name: "CanvasThink Team" }],
  openGraph: {
    title: "CanvasThink - The Joyful Exchange",
    description: "Where Help Pays Off, and Humanity Thrives",
    url: "https://canvasthink.com",
    siteName: "CanvasThink",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CanvasThink - The Joyful Exchange",
    description: "Where Help Pays Off, and Humanity Thrives",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
