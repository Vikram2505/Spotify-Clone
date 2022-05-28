import { useEffect } from "react";
import { sinnIn, useSession} from "next-auth/react"
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    accessToken: process.env.JWT_SECRET,
    // playlist: "https://api.spotify.com/v1/me/playlists"

})

function useSpotify() {
    const {data: session, status} = useSession();

    useEffect(() => {
     if (session) {
        if (session.error === "RefreshAccessTokenError"){
            sinnIn();
        } 
        spotifyApi.setAccessToken(session.user.accessToken)
     }
    }, [session])
    
    return spotifyApi;
}

export default useSpotify