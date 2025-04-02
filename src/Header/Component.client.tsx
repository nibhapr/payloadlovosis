'use client'

import Link from 'next/link'
// import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import type { Media } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
// import { useHeaderTheme } from '@/providers/HeaderTheme'

const dropdownMenus = {
  technologies: [
    { title: 'Tandemvu-technology', href: 'Tandemvu' },
    { title: 'Acusense-technology', href: 'Acusense' },
    { title: 'Darkfighter-technology', href: 'Darkfighter' },
    { title: 'Colorvu-technology', href: 'Colorvu' },
  ],
  solutions: [
    { title: 'Manufacturing solution in Dubai', href: 'Manufacturing' },
    { title: 'Retail solution in Dubai', href: 'Retail' },
    { title: 'Healthcare solution in Dubai', href: 'Healthcare' },
    { title: 'Education Solution in Dubai', href: 'Education' },
  ],
}
interface NavbarCategory {
  _id: string
  name: string
  slug: string
  order: number
  isActive: boolean
  createdAt: string
}
interface HeaderClientProps {
  logo: Media
  favicon: Media
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ logo }) => {
  /* Storing the value in a useState to avoid hydration errors */
  // const [theme, setTheme] = useState<string | null>(null)
  // const { headerTheme, setHeaderTheme } = useHeaderTheme()
  // const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navRef = useRef<HTMLDivElement>(null)
  const [navbarCategories] = useState<NavbarCategory[]>([])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveDropdown(null)
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleDropdown = useCallback(
    (dropdown: string | null) => {
      if (dropdown !== activeDropdown) {
        setActiveDropdown(dropdown)
      }
    },
    [activeDropdown],
  )

  // useEffect(() => {
  //   setHeaderTheme(null)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [pathname])

  // useEffect(() => {
  //   if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [headerTheme])

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50" ref={navRef}>
      {/* Top bar - Made responsive */}
      <div className="bg-gradient-to-r from-red-900 to-black text-white py-2 sm:py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-end sm:space-x-8 space-y-2 sm:space-y-0 text-xs sm:text-sm font-medium">
          <a
            href="tel:+97155422194"
            className="flex items-center justify-center sm:justify-start hover:text-red-300 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            +971 50 989 3134
          </a>
          <a
            href="mailto:sales@hikvision-dubai.ae"
            className="flex items-center justify-center sm:justify-start hover:text-red-300 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            sales@hikvisionuae.ae
          </a>
        </div>
      </div>

      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center transition-duration-300 ml-0 sm:ml-8"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-12 sm:h-16 w-[220px] sm:w-[300px] group">
              <Logo
                image={logo.url ?? ''}
                className="h-10 sm:h-14 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </div>
          </Link>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 
              hover:shadow-md active:bg-gray-200 focus:outline-none focus:ring-2 
              focus:ring-red-500 focus:ring-opacity-50"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>

          <div className="hidden md:flex items-center space-x-8 lg:space-x-12 bg-white">
            <div className="relative group">
              <Link
                href="/"
                className="text-gray-800 hover:text-red-600 font-medium transition-all duration-300 
                  hover:-translate-y-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 group-hover:after:w-full after:bg-red-600 after:transition-all after:duration-300"
              >
                Home
              </Link>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleDropdown('products')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button
                className="flex items-center text-gray-800 hover:text-red-600 font-medium 
                transition-all duration-300 hover:-translate-y-0.5 group relative
                after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                group-hover:after:w-full after:bg-red-600 after:transition-all after:duration-300"
              >
                Products
                <svg
                  className="w-4 h-4 ml-1.5 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-4 mt-2
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  borderTop: '2px solid #DC2626',
                }}
                role="menu"
              >
                {navbarCategories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/${category.slug}`}
                    className="block px-6 py-3 text-gray-800 hover:bg-red-50 
                      hover:text-red-600 transition-all duration-300"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleDropdown('technologies')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button
                className="flex items-center text-gray-800 hover:text-red-600 font-medium 
                  transition-all duration-300 hover:-translate-y-0.5 group relative
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                  group-hover:after:w-full after:bg-red-600 after:transition-all after:duration-300"
              >
                Technologies
                <svg
                  className="w-4 h-4 ml-1.5 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-4 mt-2
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  borderTop: '2px solid #DC2626',
                }}
                role="menu"
              >
                {dropdownMenus.technologies.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-6 py-3 text-gray-800 hover:bg-red-50 
                      hover:text-red-600 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="relative group"
              onMouseEnter={() => handleDropdown('solutions')}
              onMouseLeave={() => handleDropdown(null)}
            >
              <button
                className="flex items-center text-gray-800 hover:text-red-600 font-medium 
                  transition-all duration-300 hover:-translate-y-0.5 group relative
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                  group-hover:after:w-full after:bg-red-600 after:transition-all after:duration-300"
              >
                Solutions
                <svg
                  className="w-4 h-4 ml-1.5 transform group-hover:rotate-180 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className="absolute top-full left-0 w-64 bg-white rounded-lg shadow-lg py-4 mt-2
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-300"
                style={{
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  borderTop: '2px solid #DC2626',
                }}
                role="menu"
              >
                {dropdownMenus.solutions.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-6 py-3 text-gray-800 hover:bg-red-50 
                      hover:text-red-600 transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/About"
                className="flex items-center space-x-2 w-full px-4 py-2.5 text-gray-800 hover:bg-red-50 
                  hover:text-red-600 transition-all duration-300 rounded-lg"
              >
                About Us
              </Link>
            </div>

            <div className="relative group">
              <Link
                href="/Contact"
                className="relative inline-flex items-center px-6 py-3 text-white font-medium 
                  rounded-lg overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800" />
                <div
                  className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-700 
                  translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                />

                {/* Content */}
                <span className="relative flex items-center gap-3">
                  <svg
                    className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                  <span className="relative tracking-wider">Contact Us</span>
                </span>

                {/* Shine effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 
                  transition-all duration-500 bg-gradient-to-r from-transparent 
                  via-white to-transparent -skew-x-12 translate-x-[-200%] 
                  group-hover:translate-x-[200%]"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced version */}
        {isOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden border-t border-gray-100">
            <div className="animate-slideDown">
              {/* Home Link */}
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 text-gray-800 hover:bg-red-50 
                  hover:text-red-600 transition-all duration-300 border-b border-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>Home</span>
              </Link>

              {/* Products Mobile Menu - Enhanced */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => handleDropdown(activeDropdown === 'products' ? null : 'products')}
                  className="flex items-center justify-between w-full px-4 py-3 
                    text-gray-800 hover:bg-red-50 hover:text-red-600 
                    transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    <span>Products</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 
                      ${activeDropdown === 'products' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === 'products' && (
                  <div className="bg-gray-50 max-h-[60vh] overflow-y-auto">
                    {navbarCategories.map((category) => (
                      <Link
                        key={category._id}
                        href={`/${category.slug}`}
                        className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-red-50 
                          hover:text-red-600 transition-all duration-300 border-l-2 
                          border-transparent hover:border-red-600 ml-4"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Technologies Mobile Menu - Enhanced */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() =>
                    handleDropdown(activeDropdown === 'technologies' ? null : 'technologies')
                  }
                  className="flex items-center justify-between w-full px-4 py-3 
                    text-gray-800 hover:bg-red-50 hover:text-red-600 
                    transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                    <span>Technologies</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 
                      ${activeDropdown === 'technologies' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === 'technologies' && (
                  <div className="bg-gray-50">
                    {dropdownMenus.technologies.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-red-50 
                          hover:text-red-600 transition-all duration-300 border-l-2 
                          border-transparent hover:border-red-600 ml-4"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions Mobile Menu - Enhanced */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() =>
                    handleDropdown(activeDropdown === 'solutions' ? null : 'solutions')
                  }
                  className="flex items-center justify-between w-full px-4 py-3 
                    text-gray-800 hover:bg-red-50 hover:text-red-600 
                    transition-all duration-300"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Solutions</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 
                      ${activeDropdown === 'solutions' ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {activeDropdown === 'solutions' && (
                  <div className="bg-gray-50">
                    {dropdownMenus.solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-6 py-2.5 text-sm text-gray-600 hover:bg-red-50 
                          hover:text-red-600 transition-all duration-300 border-l-2 
                          border-transparent hover:border-red-600 ml-4"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* About & Contact Links */}
              <div className="space-y-1 p-2">
                <Link
                  href="/About"
                  className="flex items-center space-x-2 w-full px-4 py-2.5 text-gray-800 hover:bg-red-50 
                    hover:text-red-600 transition-all duration-300 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>About Us</span>
                </Link>

                <Link
                  href="/Contact"
                  className="flex items-center space-x-2 w-full px-4 py-2.5 text-white bg-gradient-to-r 
                    from-red-600 to-red-800 rounded-lg transition-all duration-300
                    hover:from-red-700 hover:to-red-900"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
