import useSpotify from "./useSpotify"

const useSonginfo = () => {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);

  return (
    <div>useSonginfo</div>
  )
}

export default useSonginfo