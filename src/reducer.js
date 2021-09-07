import { songs } from "./dataAndFunctions";

//const num = 1; // for testing purposes

export const initialState = {
    songNumber: 0,
    currentSong: songs[0],
    playlistState: songs,
    isPlaying: false,
    shuffleStates: {
        firstShuffleBack: false,
        firstShuffleFront: false,
        firstUnshuffleBack: true,
        firstUnshuffleFront: true,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SONG_NUMBER":
            return {
                ...state,
                songNumber: action.songNumber,
            }

        case "SET_CURRENT_SONG":
            return {
                ...state,
                currentSong: action.currentSong,
            }

        case "SET_PLAYLIST_STATE":
            return {
                ...state,
                playlistState: action.playlistState,
            }

        case "SET_ISPLAYING":
            return {
                ...state,
                isPlaying: action.isPlaying,
            }

        case "SET_SHUFFLE_STATES":
            return {
                ...state,
                shuffleStates: action.shuffleStates,
            }

        default:
            return state;
    }
}

export default reducer;