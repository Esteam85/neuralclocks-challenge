import {FC} from 'react'
import styles from "./circular-progress-bar.module.scss";
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressBarProps {
    totalTime: number;
}

const ProgressBar: FC<ProgressBarProps> = ({totalTime}) => {
    return (
        <div className={styles.progressBar}>
            <CircularProgressbar value={totalTime} text={totalTime+""}/>
        </div>
    );
};

export default ProgressBar;
