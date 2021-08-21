import React from "react";
import "./SongControls.css";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
// import RepeatOneRoundedIcon from '@material-ui/icons/RepeatOneRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
// import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
// import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
// import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';

const useStyles = makeStyles({
    root: {
        padding: 5,
        "&:hover": {
            color: "rgb(110, 161, 255)"
        }
    },
    controlSizeSmall: {
        fontSize: 22
    },
    controlSizeMedium: {
        fontSize: 40
    },
    controlSizeLarge: {
        fontSize: 50
    }
});

const theme = createTheme({
    palette: {
      primary: {
          main: "#ffffff"
      }
    },
});

function SongControls() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className="SongControls">
                <div className="left">
                    <IconButton className={classes.root} color="primary">
                        <ShuffleRoundedIcon className={classes.controlSizeSmall} />
                    </IconButton>

                    <IconButton className={classes.root} color="primary">
                        <RepeatRoundedIcon className={classes.controlSizeSmall} />
                    </IconButton>
                </div>

                <div className="center">
                    <IconButton className={classes.root} color="primary">
                        <SkipPreviousRoundedIcon className={classes.controlSizeMedium} />
                    </IconButton>

                    <IconButton className={classes.root} color="primary">
                        <PlayCircleFilledRoundedIcon className={classes.controlSizeLarge} />
                    </IconButton>

                    <IconButton className={classes.root} color="primary">
                        <SkipNextRoundedIcon className={classes.controlSizeMedium} />
                    </IconButton>
                </div>

                <div className="right">
                    <IconButton className={classes.root} color="primary">
                        <VolumeUpRoundedIcon className={classes.controlSizeSmall} />
                    </IconButton>

                    <input type="range" id="volumeSlider" max="1" value="1" step="0.1"></input>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default SongControls;