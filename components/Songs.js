import { useRecoilValue } from "recoil"
import { playlistItem } from "../atoms/playlistAtom"
import Song from "../components/Song"
function Songs() {
  const playlist = useRecoilValue(playlistItem);
  return (
    <div className="text-white grid space-y-1 px-8 pb-28">
        {playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} track={track} order={i} />
          // <div key={track.track.id} className="flex items-center space-x-4">
          //   <p>{i}</p>
          //     {track.track.name}
          // </div>
        ))}
    </div>
  )
}

export default Songs