import styles from "./pausebutton.module.scss"
import {FC} from "react";

const PauseButton: FC<ButtonProps> = (props) => {
    return (<button {...props} className={styles.pausebutton}>Pause</button>);
}
export default PauseButton