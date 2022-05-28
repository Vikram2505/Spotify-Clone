import { ChevronDownIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playlistIdState, playlistItem } from '../atoms/playlistAtom'
import Songs from '../components/Songs'
import spotifyApi from '../lib/spotify'
import useSpotify from '../hooks/useSpotify'

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
] 

function Center() {
  const spotifyApi = useSpotify()
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistItem)
  // const [playlistName, setPlaylistName] = useRecoilValue(playlistName)
  // setPlaylistName(playlist.name)
  console.log(playlist ,'playlist name')

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
          setPlaylist(data?.body)
        })
        .catch((err) => console.log('Something went wrong', err))
    }
  }, [playlistId, spotifyApi])

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 text-white opacity-90 hover:opacity-80">
          <img
            src={session?.user.image}
            className="h-8 w-8 rounded-full"
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 p-8 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-4xl">
            {playlist?.name}
          </h1>
          <a> {playlist?.description} </a>
        </div>
      </section>
      <div className='overflow-auto'>
        <Songs />
      </div>
    </div>
  )
}

export default Center
