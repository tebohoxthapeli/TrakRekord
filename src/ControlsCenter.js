import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import PlayCircleFilledRoundedIcon from '@material-ui/icons/PlayCircleFilledRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';

const ControlsCenter = ({ props: { root, margin, sizes: { medium, large } } }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="ControlsCenter">
            <IconButton className={root} color="primary">
                <SkipPreviousRoundedIcon className={medium} />
            </IconButton>

            <IconButton className={`${root} ${margin}`} color="primary" onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <PauseCircleFilledRoundedIcon className={large} /> : <PlayCircleFilledRoundedIcon className={large} />}
            </IconButton>

            <IconButton className={root} color="primary">
                <SkipNextRoundedIcon className={medium} />
            </IconButton>
        </div>
    );

};

export default ControlsCenter;