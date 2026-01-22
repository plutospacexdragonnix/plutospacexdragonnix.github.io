import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Anna - Full-Stack Developer",
  description: "Full-Stack Developer specializing in Node.js, Python, PHP & Laravel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
