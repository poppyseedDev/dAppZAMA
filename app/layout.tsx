import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const telegrafBold = localFont({ src: './fonts/Telegraf UltraBold 800.otf', variable: '--font-telegraf-bold' })
const telegraf = localFont({ src: './fonts/Telegraf UltraBold 800.otf', variable: '--font-telegraf' })

export const metadata = {
  title: 'Zama dApps',
  description: 'Explore decentralized applications on Zama',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${telegraf.variable} ${telegrafBold.variable}`}>
      <body className={`${telegraf.className} bg-[#ffd209]`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}

