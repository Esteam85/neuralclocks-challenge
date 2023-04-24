import styles from "./playbutton.module.scss"
import {FC} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCirclePlay} from '@fortawesome/free-solid-svg-icons'

const PlayButton: FC<ButtonProps> = (props) => {

    return (<button {...props} className={styles.playbutton}>
            <FontAwesomeIcon icon={faCirclePlay} />
        </button>
    );
}
export default PlayButton