import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useToast, Text } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const toast = useToast()

  return (
    <>
      <Head>
        <title>欢迎来到 - 垃圾洛克王国</title>
        <meta name="description" content="欢迎来到 - 垃圾洛克王国" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            感谢&nbsp;
            <a href="https://vercel.com/" target="_blank" rel="noreferrer">
              <code className={styles.code}>Vercel</code>
            </a>
            &nbsp;的服务器，以及&nbsp;
            <a href="https://supabase.com/" target="_blank" rel="noreferrer">
              <code className={styles.code}>Supabase</code>
            </a>
            &nbsp;的数据库
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <Link
            href="/pets"
            onClick={() =>
              toast({
                title: `加载宠物信息，速度取决于你的网络`,
                position: 'top',
                isClosable: true,
              })
            }
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              宠物 <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              查看数据中的宠物信息，例如：编号、名字、简介、图片以及天赋值等。
            </p>
          </Link>

          <Link
            href="/skills"
            onClick={() =>
              toast({
                title: `加载技能信息，速度取决于你的网络`,
                position: 'top',
                isClosable: true,
              })
            }
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              技能 <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              查看数据中的技能信息，例如：编号、名字、简介、威力等。
            </p>
          </Link>

          <Link
            href="/talents"
            onClick={() =>
              toast({
                title: `加载血脉信息，速度取决于你的网络`,
                position: 'top',
                isClosable: true,
              })
            }
            className={styles.card}
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              血脉 <span>-&gt;</span>
            </h2>
            <p className={inter.className}>查看全部血脉的编号、名称和描述。</p>
          </Link>

          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <Text color="gray.300">
          本项目由&nbsp;Catliar&nbsp;开发制作，数据来源于&nbsp;roco&nbsp;官方，请勿用于商业用途。
        </Text>
      </footer>
    </>
  )
}
