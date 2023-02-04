import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })
const PLAYLIST_ID = '1GrtBq8gf8kuuM8b41kt4Q'

export default function Home({ am, pm }: { am: number[], pm: number[] }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const { access_token } = router.query
    if (!access_token) return

    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setEmail(data.email)
      })
      .catch(error => console.log(error))

    fetchPlaylist()

    // fetch('/refresh_token', {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
  }, [router.query])

  const addSong = () => {
    const { access_token } = router.query
  
    fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
        uris: ['spotify:track:6y0igZArWVi6Iz0rj35c1Y']
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        fetchPlaylist()
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  const fetchPlaylist = () => {
    const { access_token } = router.query

    fetch(`https://api.spotify.com/v1/playlists/${PLAYLIST_ID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setSongs(data.tracks.items.map((i: any) => i.track.name))
      })
      .catch(error => console.log(error))
  }

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

        <div className={styles.grid}>
          <div>
            <h1 className={styles.header}>AM</h1>

            <div className={styles.timetable}>
              {am.map((i) => (
                <div key={i} className={styles.card}>
                  <p>{i}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h1 className={styles.header}>PM</h1>
            
            <div className={styles.timetable}>
              {pm.map((i) => (
                <div key={i} className={styles.card}>
                  <p>{i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {songs.map((song) => (<p key={song}>{song}</p>))}
        </div>

        <input></input>
        <button onClick={addSong}>Add song</button>

        <p style={{marginTop: '64px'}}>Logged in as: <strong>{email}</strong></p>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const am = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const pm = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return {
    props: {
      am,
      pm
    },
  }
}
