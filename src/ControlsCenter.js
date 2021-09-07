import React from "react";
import { useDataLayerValue } from './DataLayer';

import IconButton from "@material-ui/core/IconButton";
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';

const ControlsCenter = ({ props: { root, margin, sizes: { medium, large } } }) => {
    const [{ isPlaying, playlistState, songNumber, shuffleStates, currentSong }, dispatch] = useDataLayerValue();

    const dispatchCurrentSong = (newSongNumber) => {
        dispatch({
            type: "SET_SONG_NUMBER",
            songNumber: newSongNumber,
        });

        dispatch({
            type: "SET_CURRENT_SONG",
            currentSong: playlistState[newSongNumber],
        });
    };

    const setShuffleStateTrue = () => {
        dispatch({
            type: "SET_SHUFFLE_STATES",
            shuffleStates: {
                ...shuffleStates,
                firstShuffleBack: true,
                firstShuffleFront: true,
            }
        });
    };

    const setUnshuffleStateTrue = () => {
        dispatch({
            type: "SET_SHUFFLE_STATES",
            shuffleStates: {
                ...shuffleStates,
                firstUnshuffleBack: true,
                firstUnshuffleFront: true,
            }
        });
    };

    const skipForward = (increment) => {
        let newSongNumber, next;

        if (shuffleStates.firstShuffleFront === false) {
            setShuffleStateTrue();
            newSongNumber = 0;
            next = playlistState[newSongNumber];

            if (currentSong.title === next.title && currentSong.artist === next.artist) {
                newSongNumber += 1;
            }
        }
        else if (shuffleStates.firstUnshuffleFront === false) {
            setUnshuffleStateTrue();
            newSongNumber = (songNumber === playlistState.length - 1) ? 0 : songNumber + 1;
            next = playlistState[newSongNumber];

            if (currentSong.title === next.title && currentSong.artist === next.artist) {
                newSongNumber = (newSongNumber === playlistState.length - 1) ? 0 : newSongNumber + 1;
            }
        }
        else {
            newSongNumber = (increment === true) ? songNumber + 1 : songNumber;
            newSongNumber = (newSongNumber > playlistState.length - 1) ? 0 : newSongNumber;
        }

        dispatchCurrentSong(newSongNumber);
    };

    const goBackwards = () => {
        let newSongNumber, back;

        if (shuffleStates.firstShuffleBack === false) {
            setShuffleStateTrue();

            newSongNumber = playlistState.length - 1;
            back = playlistState[newSongNumber];

            if (currentSong.title === back.title && currentSong.artist === back.artist) {
                newSongNumber -= 1;
            }
        }
        else if (shuffleStates.firstUnshuffleBack === false) {
            setUnshuffleStateTrue();

            newSongNumber = songNumber;
            back = playlistState[songNumber];

            if (currentSong.title === back.title && currentSong.artist === back.artist) {
                newSongNumber = (newSongNumber === 0) ? playlistState.length - 1 : newSongNumber - 1;
            }
        }
        else {
            newSongNumber = (songNumber === 0) ? playlistState.length - 1 : songNumber - 1;
        }
        
        dispatchCurrentSong(newSongNumber);
    };

    const skipBackward = () => {
        // if (audioFile.current.currentTime >= 5) {
        //     seekBar.current.value = 0;
        // }
        // else 
        goBackwards();
    };

    return (
        <div className="ControlsCenter">
            <IconButton className={root} color="primary" onClick={skipBackward}>
                <SkipPreviousRoundedIcon className={medium} />
            </IconButton>

            <IconButton className={`${root} ${margin}`} color="primary" onClick={() => {
                dispatch({
                    type: "SET_ISPLAYING",
                    isPlaying: !isPlaying,
                });
            }}>
                {isPlaying ? <PauseCircleFilledRoundedIcon className={large} /> : <PlayCircleFilledRoundedIcon className={large} />}
            </IconButton>

            <IconButton className={root} color="primary" onClick={() => skipForward(true)}>
                <SkipNextRoundedIcon className={medium} />
            </IconButton>
        </div>
    );

};

export default ControlsCenter;