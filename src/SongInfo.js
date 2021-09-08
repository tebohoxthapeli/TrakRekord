import React, { useState, useRef, useEffect } from "react";
import { useDataLayerValue } from './DataLayer';
import { formatTime } from "./dataAndFunctions";

import "./SongInfo.css";

function SongInfo() {
    const [seekBarValue, setSeekBarValue] = useState(0);
    const [time, setTime] = useState({ currentTime: 0, duration: 0 });
    const [manualSeekChange, setManualSeekChange] = useState(0);

    const [{ currentSong, isPlaying, reset, repeat, songNumber, playlistState }, dispatch] = useDataLayerValue();

    const audioRef = useRef(null);
    const seekBarRef = useRef(null);

    useEffect(() => {
        setTime({
            ...time,
            currentTime: 0
        })
        audioRef.current.currentTime = 0;
        // eslint-disable-next-line
    }, [reset]);

    useEffect(() => {
        setSeekBarValue(0); 

        setTimeout(() => {
            setTime({ currentTime: 0, duration: audioRef.current.duration });
            seekBarRef.current.max = time.duration;
        }, 500) 

        // eslint-disable-next-line
    }, [currentSong,  time.duration, dispatch]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();

            setInterval(() => {
                setTime((time) => {
                    return {
                        ...time,
                        currentTime: audioRef.current.currentTime,
                    }
                })
            }, 500)
        }
        else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentSong])

    useEffect(() => {
        setSeekBarValue(time.currentTime);
    }, [time.currentTime]);

    useEffect(() => {
        audioRef.current.currentTime = seekBarValue;

        setTime({
            ...time,
            currentTime: seekBarValue,
        })
        // eslint-disable-next-line
    }, [manualSeekChange]);

    useEffect(() => {
        dispatch({
            type: "SET_AUDIO",
            audio: audioRef.current,
        })
    }, [dispatch]);

    const handleRepeat = () => {
        let newSongNumber;

        switch (repeat) {
            case "once":
                dispatch({
                    type: "SET_RESET",
                    reset: (reset + 1),
                })
                audioRef.current.play();
                break;

            case "all":
                newSongNumber = (songNumber === playlistState.length - 1) ? 0 : songNumber + 1;
                dispatch({
                    type: "SET_SONG_NUMBER",
                    songNumber: newSongNumber,
                });
                dispatch({
                    type: "SET_CURRENT_SONG",
                    currentSong: playlistState[newSongNumber],
                });
                break;

            case "off":
                if (songNumber === playlistState.length - 1) {
                    audioRef.current.pause();
                    dispatch({
                        type: "SET_ISPLAYING",
                        isPlaying: false,
                    });
                }
                else {
                    newSongNumber = songNumber + 1;
                    dispatch({
                        type: "SET_SONG_NUMBER",
                        songNumber: newSongNumber,
                    });
                    dispatch({
                        type: "SET_CURRENT_SONG",
                        currentSong: playlistState[newSongNumber],
                    })
                }
                break;
            default:
                return;
        }
    }

    useEffect(() => {
        const dup = audioRef.current;

        audioRef.current.addEventListener("ended", handleRepeat);
        return () => dup.removeEventListener("ended", handleRepeat);
        // eslint-disable-next-line
    }, [songNumber])

    return (
        <div className="SongInfo">
            <audio src={`songs/${currentSong.title}.mp3`} ref={audioRef}></audio>

            <div className="imageContainer">
                <img id="cover" src={`coverArt/${currentSong.album}.jpg`} alt="cover art" />
            </div>

            <div className="musicInfo">
                <h2 id="title">{currentSong.title}</h2>

                <div className="artistAlbum">
                    <p id="artist">{currentSong.artist}</p>
                    <span>-</span>
                    <p id="album">{currentSong.album}</p>
                </div>
            </div>

            <div className="seekBarContainer">
                <input
                    type="range"
                    id="seekBar"
                    name="seekBar"
                    ref={seekBarRef}
                    value={seekBarValue}
                    onChange={(e) => {
                        setSeekBarValue(e.target.value)
                    }}
                    onClick={() => setManualSeekChange((prev) => prev + 1)}
                />

                <div>
                    <p className="currentTime">{formatTime(time.currentTime)}</p>
                    <p className="duration">{formatTime(time.duration)}</p>
                </div>
            </div>
        </div>
    );
}

export default SongInfo;