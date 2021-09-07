import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDataLayerValue } from './DataLayer';
import IconButton from "@material-ui/core/IconButton";
import PlayArrowSharpIcon from '@material-ui/icons/PlayArrowSharp';
import RemoveCircleOutlineSharpIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import "./PlaylistSongs.css";

const useStyles = makeStyles({
    removeCircleBtn: {
        padding: 6,
    },
    removeCircle: {
        fontSize: 20,
    },
    playArrow: {
        fontSize: 20,
    },
});

const PlaylistSongs = ({ props: { title, artist, index, playState } }) => {
    const classes = useStyles();
    const [{ playlistState }, dispatch] = useDataLayerValue();

    const handleClick = () => {
        dispatch({
            type: "SET_CURRENT_SONG",
            currentSong: playlistState[index],
        });

        dispatch({
            type: "SET_SONG_NUMBER",
            songNumber: index,
        });
    };

    return (
            <div className="PlaylistSongs">
                <button className={`btn ${playState && "isPlaying"}`} onClick={handleClick}>
                    <div className="item">
                        <div className="playIcon">
                            <PlayArrowSharpIcon className={`${classes.playArrow} play-arrow`} />
                        </div>

                        <div className="info">
                            <h4>{title}</h4>
                            <p>{artist}</p>
                        </div>
                    </div>
                </button>

                <div className="icon">
                    <IconButton color="primary" className={`${classes.removeCircleBtn} remove-circle-btn`}>
                        <RemoveCircleOutlineSharpIcon className={`${classes.removeCircle} remove-circle`} />
                    </IconButton>
                </div>
            </div>
    );
};

export default PlaylistSongs;