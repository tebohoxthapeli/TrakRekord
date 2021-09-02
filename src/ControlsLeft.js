import React, { useState } from "react";

import IconButton from "@material-ui/core/IconButton";
import ShuffleRoundedIcon from '@material-ui/icons/ShuffleRounded';
import RepeatRoundedIcon from '@material-ui/icons/RepeatRounded';
import RepeatOneRoundedIcon from '@material-ui/icons/RepeatOneRounded';

const ControlsLeft = ({ props: { root, size, marginRight }}) => {
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeat, setRepeat] = useState("off");

    const handleRepeat = () => {
        if (repeat === "off") setRepeat("once");
        else if (repeat === "once") setRepeat("all");
        else setRepeat("off");
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
            <IconButton className={`${root} ${marginRight}`} color={shuffleColour()} onClick={() => setIsShuffle(!isShuffle)}>
                <ShuffleRoundedIcon className={size} />
            </IconButton>

            <IconButton className={`${root} ${marginRight}`} color={repeatColour()} onClick={handleRepeat}>
                {(repeat === "once") ? <RepeatOneRoundedIcon className={size} /> : <RepeatRoundedIcon className={size} />}
            </IconButton>
        </div>
    );
};

export default ControlsLeft;