import React from "react";
import { createTheme, ThemeProvider, makeStyles } from "@material-ui/core/styles";

import ControlsLeft from "./ControlsLeft";
import ControlsCenter from "./ControlsCenter";
import ControlsRight from "./ControlsRight";
import "./SongControls.css";

const useStyles = makeStyles({
    root: {
        padding: 5,
        "&:hover": {
            color: "rgb(110, 161, 255)",
        },
    },
    small: {
        fontSize: 24
    },
    medium: {
        fontSize: 40
    },
    large: {
        fontSize: 50
    },
    marginLarge: {
        margin: "0 0.8rem"
    },
    marginRight: {
        marginRight: "0.8rem"
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

function SongControls() {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className="SongControls">

                <div className="left">
                    <ControlsLeft props={{
                        root: classes.root,
                        size: classes.small,
                        marginRight: classes.marginRight,
                    }} />
                </div>

                <div className="center">
                    <ControlsCenter props={{
                        root: classes.root,
                        sizes: {
                            medium: classes.medium,
                            large: classes.large,
                        },
                        margin: classes.marginLarge,
                    }} />
                </div>

                <div className="right">
                    <ControlsRight props={{
                        root: classes.root,
                        size: classes.small,
                    }} />
                </div>
            </div>
        </ThemeProvider>
    );
}

export default SongControls;