import { atom } from "recoil";

export const playlistItem = atom({
    key:"playlistItem",
    default: null,
})

export const playlistIdState = atom({
    key:"playlistIdState",
    default: '37i9dQZF1DXaXB8fQg7xif' 
})

export const playlistName = atom ({
    key: "playlistName",
    default: 'home'
})