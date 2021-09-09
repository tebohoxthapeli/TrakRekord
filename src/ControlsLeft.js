import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import RepeatOneRoundedIcon from '@material-ui/icons/RepeatOneRounded';

import { useDataLayerValue } from './DataLayer';
import { shuffleSongs, songs } from "./dataAndFunctions";

const ControlsLeft = ({ props: { root, size, marginRight } }) => {
    const [{ playlistState, songNumber, repeat }, dispatch] = useDataLayerValue();

    const [lastSongNumber, setLastSongNumber] = useState(0);
    const [isShuffle, setIsShuffle] = useState(false);

    const handleShuffle = () => {
        if (isShuffle) {
            dispatch({
                type: "SET_SHUFFLE_STATES",
                shuffleStates: {
                    firstShuffleBack: false,
                    firstShuffleFront: false,
                    firstUnshuffleBack: true,
                    firstUnshuffleFront: true,
                },
            });

            dispatch({
                type: "SET_PLAYLIST_STATE",
                playlistState: shuffleSongs(playlistState),
            });

            setLastSongNumber(songNumber);
        }
        else {
            dispatch({
                type: "SET_SHUFFLE_STATES",
                shuffleStates: {
                    firstUnshuffleBack: false,
                    firstUnshuffleFront: false,
                    firstShuffleBack: true,
                    firstShuffleFront: true,
                },
            });
            
            dispatch({
                type: "SET_PLAYLIST_STATE",
                playlistState: [...songs],
            });

            dispatch({
                type: "SET_SONG_NUMBER",
                songNumber: lastSongNumber,
            });
        }
    };

    useEffect(() => {
        handleShuffle();
        // eslint-disable-next-line
    }, [isShuffle]);

    const switchRepeatState = () => {
        switch(repeat) {
            case "off": return "once"
            case "once": return "all"
            default: return "off"
        }
    }

    const handleRepeat = () => {
        dispatch({
            type: "SET_REPEAT",
            repeat: switchRepeatState(),
        });
        console.log(switchRepeatState());
    };

    const shuffleColour = () => {
        if (isShuffle) return "secondary";
        return "primary";
    };

    const repeatColour = () => {
        if (repeat === "once" || repeat === "all") return "secondary";
        return "primary";
    };

    return (
        <div className="ControlsLeft">
            <IconButton className={`${root} ${marginRight}`} color={shuffleColour()} onClick={() => {
                setIsShuffle(prevIsShuffle => !prevIsShuffle);
            }}>
                <ShuffleRoundedIcon className={size} />
            </IconButton>

            <IconButton className={`${root} ${marginRight}`} color={repeatColour()} onClick={handleRepeat}>
                {(repeat === "once") ? <RepeatOneRoundedIcon className={size} /> : <RepeatRoundedIcon className={size} />}
            </IconButton>
        </div>
    );
};

export default ControlsLeft;