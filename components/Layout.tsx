import { Switch } from '@nextui-org/react'
import Head from 'next/head'

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <>
      <Head>
        <title>{title || '垃圾洛克王国'}</title>
        <meta name="description" content="垃圾洛克王国" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  )
}
