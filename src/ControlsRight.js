import React, { useState, useEffect } from "react";

import IconButton from "@material-ui/core/IconButton";
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeMuteRoundedIcon from '@material-ui/icons/VolumeMuteRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';
import VolumeDownRoundedIcon from '@material-ui/icons/VolumeDownRounded';

import "./ControlsRight.css";
import { useDataLayerValue } from './DataLayer';

let lastValue;

const ControlsRight = ({ props: { root, size } }) => {
    const [{ vol }, dispatch] = useDataLayerValue();
    const [isMute, setIsMute] = useState(false);
    const [volume, setVolume] = useState(1);

    useEffect(() => {
        lastValue = vol;
        // eslint-disable-next-line
    }, [])

    const getIconState = () => {
        if (!isMute) {
            if (volume > 0.5) return "volume up";
            if (volume < 0.6 && volume > 0) return "volume down";
            return "volume mute";
        }
    };

    useEffect(() => {
        dispatch({
            type: "SET_VOLUME",
            vol: volume,
        });
        // eslint-disable-next-line
    }, [volume]);

    useEffect(() => {
        if (isMute) {
            setVolume((volume) => {
                lastValue = volume;
                return 0;
            })
        }
        else setVolume(lastValue);
    }, [isMute]);

    return (
        <div className="ControlsRight">
            <IconButton className={root} color="primary" onClick={() => setIsMute(!isMute)}>

                {(getIconState() === "volume up") && <VolumeUpRoundedIcon className={size} />}
                {(getIconState() === "volume down") && <VolumeDownRoundedIcon className={size} />}
                {(getIconState() === "volume mute") && <VolumeMuteRoundedIcon className={size} />}
                {isMute && <VolumeOffRoundedIcon className={size} />}

            </IconButton>

            <input
                type="range"
                id="volumeSlider"
                name="volumeSlider"
                max="1"
                value={volume}
                step="0.1"
                onChange={(e) => {
                    if (isMute) {
                        lastValue = 0;
                        setIsMute(false);
                    }
                    setVolume(e.target.value);
                }}
            />
        </div>
    );
};

export default ControlsRight;