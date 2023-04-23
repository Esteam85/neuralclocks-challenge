import React, { MouseEvent } from 'react';
import styles from "./settingsbutton.module.scss"
import {FC} from "react";

interface SettingsButtonProps {
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SettingsButton: FC<SettingsButtonProps> = ({onClick}) =>{
    return (<button onClick={onClick} className={styles.settingsbutton}>Settings</button>) ;
}
export default SettingsButton