import React, { useState, useRef, useEffect } from "react";
import { useDataLayerValue } from './DataLayer';
import { formatTime } from "./dataAndFunctions";

import "./SongInfo.css";

function SongInfo() {
    const [seekBarValue, setSeekBarValue] = useState(0);
    const [time, setTime] = useState({ currentTime: 0, duration: 0 });

    const [{ currentSong }] = useDataLayerValue();

    const audioRef = useRef(null);
    const seekBarRef = useRef(null);

    // const callOverFiveSecs = () => {
    //     setSeekBarValue(0);
    // };

    // useEffect(() => {
    //     dispatch({
    //         type: "SET_SEEKBAR_VALUE_0",
    //         setSeekBarValueZero: callOverFiveSecs,
    //     });
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        setSeekBarValue(0);

        setTimeout(() => {
            setTime({ currentTime: 0, duration: audioRef.current.duration });
            seekBarRef.current.max = time.duration;

        }, 500); // eslint-disable-next-line
    }, [currentSong, time.duration]);

    useEffect(() => {
        audioRef.current.currentTime = seekBarValue;
        setTime((time) => {
            return {
                ...time,
                currentTime: seekBarValue
            }
        });
    }, [seekBarValue]);

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
                    onChange={(e) => setSeekBarValue(e.target.value)} />
                <div>
                    <p className="currentTime">{formatTime(time.currentTime)}</p>
                    <p className="duration">{formatTime(time.duration)}</p>
                </div>
            </div>
        </div>
    );
}

export default SongInfo;