import React, { useState, useEffect } from "react";
import { useDataLayerValue } from './DataLayer';
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import PlaylistPlaySharpIcon from '@material-ui/icons/PlaylistPlaySharp';
import "./UpNext.css";
import PlaylistSongs from "./PlaylistSongs";

const useStyles = makeStyles({
    root: {
        fontSize: 40,
        margin: 0,
    },
});

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff",
        },
        secondary: {
            main: "#2196f3",
        },
    }
});

const UpNext = () => {
    const classes = useStyles();
    const [{ playlistState, currentSong }] = useDataLayerValue();
    const [newPlaylistState, setNewPlaylisState] = useState(playlistState);

    useEffect(() => {
        setNewPlaylisState(playlistState);
    }, [playlistState]);

    return (
        <ThemeProvider theme={theme}>
            <div className="UpNext">
                <header>
                    <PlaylistPlaySharpIcon className={classes.root} />
                    <h2>up next</h2>
                </header>

                {newPlaylistState.map((song, index) => {
                    const stateObject = { ...song, index, };

                    if (song.id === currentSong.id ) {
                        stateObject.playState = "isPlaying";
                    }

                    return (
                        <PlaylistSongs key={song.id} props={stateObject}/>
                    );
                })}


            </div>
        </ThemeProvider>
    );
};

export default UpNext;