import React from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSpotify from '../hooks/useSpotify'
import { miliisToMinutesAndSeconds } from '../lib/time'

function Song({ track, order, key }) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  
  const playSong = () => {
		setCurrentTrackId(track.track.id);
		setIsPlaying(true)
		spotifyApi.play({
			uris: [track.track.uri]
		})
  }

  return (
    <div className="grid cursor-pointer grid-cols-2 rounded-lg px-3 text-gray-400 hover:bg-gray-900" onClick={playSong}>
      <div className="flex-col-2 flex h-14 items-center space-x-4">
        <p className="text-gray-300">{order + 1}</p>
        <img
          className="h-10 w-10"
          src={track.track.album.images[2].url}
          alt=""
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="flex items-center">
            {track.track.explicit && (
              <div
                title="Explicit"
                className="mr-2 h-4 w-4 rounded-sm bg-gray-400 text-center text-xs text-black"
              >
                E
              </div>
            )}
            {/* {track.track.album.artists.map((artist, i) => (    */}
            {/* ))} */}
            <p className="mr-1 w-40 text-gray-400">
              {track.track.album.artists[0].name}
            </p>
          </p>
        </div>
      </div>
      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="w-50 hidden md:inline">{track.track.album.name}</p>
        <p className="w-40">{track.added_at}</p>
        <p>
          {/* {(track.track.duration_ms /60000).toFixed(2)} */}
          {miliisToMinutesAndSeconds(track.track.duration_ms)}
        </p>
      </div>
    </div>
  )
}

export default Song
