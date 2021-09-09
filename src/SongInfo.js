import React, { useState, useRef, useEffect } from "react";
import { useDataLayerValue } from './DataLayer';
import { formatTime } from "./dataAndFunctions";

import "./SongInfo.css";

let noChangeSeek = false;
let timer;

function SongInfo() {
    const [seekBarValue, setSeekBarValue] = useState(0);
    const [time, setTime] = useState({ currentTime: 0, duration: 0 });
    const [manualSeekChange, setManualSeekChange] = useState(0);

    const [{ currentSong, isPlaying, reset, repeat, songNumber, playlistState, vol }, dispatch] = useDataLayerValue();

    const audioRef = useRef(null);
    const seekBarRef = useRef(null);
    const repeatRef = useRef(false);

    useEffect(() => {
        audioRef.current.volume = vol;
    }, [vol]);

    // REFRESH COMPONENTS FOR NEW SONG
    useEffect(() => {
        setSeekBarValue(0);
        setTimeout(() => {
            setTime({ currentTime: 0, duration: Math.trunc(audioRef.current.duration) });
            seekBarRef.current.max = time.duration;
        }, 500)

        // eslint-disable-next-line
    }, [currentSong, time.duration, dispatch]);


    // UPDATE SONG TIME
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();

            clearInterval(timer);
            timer = setInterval(() => {
                setTime((time) => ({ 
                    ...time,
                    currentTime: time.currentTime + 1,
                }));

            }, 1000);
        }
        else {
            audioRef.current.pause();
            clearInterval(timer);
        }        
    }, [isPlaying, currentSong, reset]);


    // UPDATE SONG CURRENT TIME WHEN SEEKBAR MANUALLY CHANGED
    useEffect(() => {
        noChangeSeek = true;
        audioRef.current.currentTime = seekBarValue;
        setTime({ ...time, currentTime: Number(seekBarValue) });

        // eslint-disable-next-line
    }, [manualSeekChange]);


    // UPDATE SEEKBAR VALUE WHEN SONG CURRENT TIME CHANGES
    useEffect(() => {
        if (!noChangeSeek) setSeekBarValue(time.currentTime);
        noChangeSeek = false;

        // eslint-disable-next-line
    }, [time.currentTime]);


    // DISPATCH CURRENT SONG SO OTHER MODULES HAVE ACCESS TO IT
    useEffect(() => {
        dispatch({ type: "SET_AUDIO", audio: audioRef.current });
    }, [dispatch]);



    useEffect(() => {
        repeatRef.current = repeat;
    }, [repeat]);


    // GO BACK TO BEGINNING OF A SONG
    useEffect(() => {
        setTime({ ...time, currentTime: 0 });
        audioRef.current.currentTime = 0;

        // eslint-disable-next-line
    }, [reset]);


    // REPEAT BUTTON FUNCTIONALITY
    const handleRepeat = () => {
        let newSongNumber;
        // clearInterval(timer);

        switch (repeatRef.current) {
            case "once":
                dispatch({ type: "SET_RESET", reset: (reset + 1) });
                audioRef.current.play();
                break;

            case "all":
                // clearInterval(timer);
                newSongNumber = (songNumber === playlistState.length - 1) ? 0 : songNumber + 1;
                dispatch({ type: "SET_SONG_NUMBER", songNumber: newSongNumber });
                dispatch({ type: "SET_CURRENT_SONG", currentSong: playlistState[newSongNumber] });
                break;

            case "off":
                if (songNumber === playlistState.length - 1) {
                    audioRef.current.pause();
                    setTime({ ...time, currentTime: 0 });
                    dispatch({ type: "SET_ISPLAYING", isPlaying: false });
                }
                else {
                    // clearInterval(timer);
                    newSongNumber = songNumber + 1;
                    dispatch({ type: "SET_SONG_NUMBER", songNumber: newSongNumber });
                    dispatch({ type: "SET_CURRENT_SONG", currentSong: playlistState[newSongNumber] });
                }
                break;

            default:
                return;
        }
    }

    // WHAT TO DO WHEN THE SONG ENDS
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