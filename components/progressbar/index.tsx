import {FC} from 'react'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface ProgressBarProps {
    totalTime: number;
    text: string;
    styles: { pathColor: string }
}

const ProgressBar: FC<ProgressBarProps> = ({totalTime, text, styles}) => {
    return (
        <div>
            <CircularProgressbar styles={buildStyles({
                textColor:"#000",
                ...styles
            })} value={totalTime} text={text}/>
        </div>
    );
};

export default ProgressBar;
