import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quantum Computing Learning Hub',
  description: 'A dynamic teaching webpage for quantum computing concepts',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quantum Computing Learning Hub</h1>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="hover:text-purple-200 transition-colors">Home</a>
              <a href="/modules" className="hover:text-purple-200 transition-colors">Modules</a>
              <a href="/interactive-lab" className="hover:text-purple-200 transition-colors">Interactive Lab</a>
              <a href="/resources" className="hover:text-purple-200 transition-colors">Resources</a>
              <a href="/about" className="hover:text-purple-200 transition-colors">About</a>
            </nav>
            <button className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>
        {children}
        <footer className="bg-gray-900 text-white p-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Quantum Computing Learning Hub</h3>
                <p className="text-gray-400">A dynamic teaching resource for quantum computing concepts</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                <ul className="space-y-1">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/modules" className="text-gray-400 hover:text-white transition-colors">Learning Modules</a></li>
                  <li><a href="/interactive-lab" className="text-gray-400 hover:text-white transition-colors">Interactive Lab</a></li>
                  <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
              <p>© {new Date().getFullYear()} Quantum Computing Learning Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
