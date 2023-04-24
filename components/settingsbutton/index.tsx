import React, {MouseEvent} from 'react';
import styles from "./settingsbutton.module.scss"
import {FC} from "react";
import {faGear} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SettingsButton: FC<ButtonProps> = ({onClick}) => {
    return (
        <button onClick={onClick} className={styles.settingsbutton}>
            <FontAwesomeIcon icon={faGear}/>
        </button>);
}
export default SettingsButton