import styles from "./playbutton.module.scss"
import {FC} from "react";

const PlayButton: FC<ButtonProps> = (props) => {
    return (<button {...props} className={styles.playbutton}>Play</button>);
}
export default PlayButton