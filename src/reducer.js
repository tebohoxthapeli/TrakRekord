import { songs } from "./dataAndFunctions";

const num = 3; // for testing purposes

export const initialState = {
    songNumber: num || 0,
    currentSong: songs[num || 0],
    playlistState: songs,
};


const reducer = (state, action) => {
    
}

export default reducer;