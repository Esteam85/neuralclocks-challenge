import styles from "./pausebutton.module.scss"
import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePause} from "@fortawesome/free-solid-svg-icons";

const PauseButton: FC<ButtonProps> = (props) => {
    return (
        <button {...props} className={styles.pausebutton}>
            <FontAwesomeIcon icon={faCirclePause}/>
        </button>
    )
}
export default PauseButton