import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "../components/Sidebar"
import Center from "../components/Center"
import Player from "../components/Player"
import { getSession } from 'next-auth/react'
import { useRecoilState, useRecoilValue } from 'recoil'
 
function Home( session ) {
  // const playlistName = useRecoilValue(playlistName)
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Spotify | Clone</title>
        <link rel="icon" href="https://open.scdn.co/cdn/images/favicon16.c498a969.png" />
      </Head>

      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>
    </div>
  )
}

export default Home

export async function getServerSideProps(contex) {
  const session = await getSession(contex);
  return{
    props: {
      session
    }
  }
}   
