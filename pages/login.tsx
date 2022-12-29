import styles from '../styles/Home.module.css'
import LoginPage from '../components/LoginPage'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>垃圾洛克王国 - 登录页面</title>
        <meta name="description" content="垃圾洛克王国" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <LoginPage />
      </main>
    </>
  )
}
