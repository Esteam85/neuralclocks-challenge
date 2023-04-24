import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePause, faCirclePlay, faGear} from "@fortawesome/free-solid-svg-icons";

interface ButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    form?: string;
    value?: string;
    autoFocus?: boolean;
}

export const PauseButton: FC<ButtonProps> = (props) => {
    return (
        <button {...props}>
            <FontAwesomeIcon icon={faCirclePause}/>
        </button>
    )
}

export const PlayButton: FC<ButtonProps> = (props) => {

    return (<button {...props}>
            <FontAwesomeIcon icon={faCirclePlay} />
        </button>
    );
}

export const SettingsButton: FC<ButtonProps> = ({onClick}) => {
    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faGear}/>
        </button>);
}