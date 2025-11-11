import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.scss'

import menu from "@public/icons/menu.svg"
import user from "@public/icons/user.svg"
import spiderlogo from '@public/spider-logo.svg'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'SpiderVerse',
  description: 'Creating a parallax carousel from spiderverse using React, NextJS and FramerMotion',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header draggable='false'>
          <Image src={menu} alt='Menu options' width={36} height={25} />
          <Link draggable='false' href={'/'}>
            <Image
              draggable='false'
              src={spiderlogo}
              alt='Spider-Man'
              width={260}
              height={70}
            />
          </Link>
          <Image src={user} alt='Login' width={36} height={36} />
        </header>
        {children}
      </body>
    </html>
  )
}
