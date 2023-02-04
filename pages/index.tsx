import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ am, pm }: { am: number[], pm: number[] }) {
  return (
    <>
      <Head>
        <title>Circadian</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1 className={styles.title}>
          Circadian
        </h1>

        <a href="/api/login">Login to Spotify</a>
      </main>
    </>
  )
}
