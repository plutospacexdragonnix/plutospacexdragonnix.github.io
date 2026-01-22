"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Me", path: "/about" },
  { name: "Skills", path: "/skills" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center z-50">
      <div className="relative bg-mainBlack border border-zinc-700 px-3 py-2 rounded-xl flex items-center gap-3">
        <div className="flex gap-4 items-center">
          {navItems.map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-100 ${
                pathname === nav.path
                  ? "bg-zinc-700 text-mainWhite"
                  : "text-zinc-400 hover:text-mainWhite hover:bg-zinc-800"
              }`}
            >
              {nav.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
