import {cn} from '@/lib/utils'
import '@styles/globals.css'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/Toaster'
import {Inter} from 'next/font/google'
import Providers from '@/components/Providers'

export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}
const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={cn('bn-white text0slate-900 antialiased light',
    )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Providers>

        <Navbar /> 
        <div className="container max-w-7xl mx-auto h-full pt-12">
          {children}
        </div>

        <Toaster />
        </Providers>
         {children}</body>
    </html>
  )
}
