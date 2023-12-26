import type { Metadata } from 'next'
import Image from 'next/image'
import './globals.scss'

export const metadata: Metadata = {
  title: 'SpiderVerse',
  description: 'Creating a parallax carousel from spiderverse using React, NextJS and FramerMotion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <header>
          <Image src="/icons/menu.svg" alt='Menu options' width={36} height={25} />
          <Image src="/spider-logo.svg" alt='Spider-Man' width={260} height={70} />
          <Image src="/icons/user.svg" alt='Login' width={36} height={36} />
        </header>
        {children}
      </body>
    </html>
  )
}
