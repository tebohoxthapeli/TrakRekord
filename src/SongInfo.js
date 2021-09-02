import React, { useState, useRef, useEffect } from "react";
import { useDataLayerValue } from './DataLayer';
import { formatTime } from "./dataAndFunctions";

import "./SongInfo.css";

function SongInfo() {
    const [seekBarValue, setSeekBarValue] = useState(0);
    const [{ currentSong: { title, artist, album } }] = useDataLayerValue();
    const [time, setTime] = useState({ currentTime: "", duration: "" });
    const audioRef = useRef(null);

    useEffect(() => {
        setTimeout(() => { 
            setTime({
                currentTime: formatTime(audioRef.current.currentTime),
                duration: formatTime(audioRef.current.duration),
            });
            console.log(audioRef.current);
            console.log(`current time: ${audioRef.current.currentTime}\nduration: ${audioRef.current.duration}`);
        }, 400);
    }, []);
    
    return (
        <div className="SongInfo">
            <audio src={`songs/${title}.mp3`} ref={audioRef}></audio>

            <div className="imageContainer">
                <img id="cover" src={`coverArt/${album}.jpg`} alt="cover art" />
            </div>

            <div className="musicInfo">
                <h2 id="title">{title}</h2>

                <div className="artistAlbum">
                    <p id="artist">{artist}</p>
                    <span>-</span>
                    <p id="album">{album}</p>
                </div>
            </div>

            <div className="seekBarContainer">
                <input type="range" id="seekBar" name="seekBar" value={seekBarValue} onChange={(e) => setSeekBarValue(e.target.value)} />
                <div>
                    <p className="currentTime">{time.currentTime}</p>
                    <p className="duration">{time.duration}</p>
                </div>
            </div>
        </div>
    );
}

export default SongInfo;