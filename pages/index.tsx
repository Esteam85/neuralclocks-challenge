import styles from "./home.module.scss"
import ProgressBar from "components/progressbar";
import PlayButton from "components/playbutton";
import PauseButton from "components/pausebutton";
import Settings from "components/settings";
import {useContext, useEffect, useRef, useState} from "react";
import SettingsButton from "components/settingsbutton";
import {PomodoroContext} from "context/state";

const MINUTE_IN_SECONDS = 60
const red = '#f54e4e';
const green = '#4aec8c';

enum ModeType {
    Working = 1,
    Break,
}

const Home = () => {
    const [settings, setSettings] = useState(true)
    const [isPause, setIsPause] = useState(true)
    const [secondsLeft, setSecondsLeft] = useState(0)
    const [mode, setMode] = useState<number>(ModeType.Working)
    const context = useContext(PomodoroContext)

    const secondsLeftRef = useRef(secondsLeft)
    const isPauseRef = useRef(isPause)
    const modeRef = useRef(mode)

    function initTimer() {
        setSecondsLeft(context.workMinutes * MINUTE_IN_SECONDS)
    }


    function switchMode() {
        const nextMode = modeRef.current === ModeType.Working ? ModeType.Break: ModeType.Working
        const nextSeconds = (nextMode === ModeType.Working ? context.workMinutes : context.breakMinutes) * MINUTE_IN_SECONDS
        setMode(nextMode)
        modeRef.current = nextMode
        setSecondsLeft(nextSeconds)
        secondsLeftRef.current = nextSeconds
    }

    function tick() {
        secondsLeftRef.current--
        setSecondsLeft(secondsLeftRef.current)
    }

    function initPomodoro() {
        secondsLeftRef.current = context.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        initPomodoro();
        const intervalID = setInterval(() => {
            if (isPauseRef.current) {
                return;
            }

            if (secondsLeftRef.current === 0) {
                return switchMode()
            }

            tick()
        }, 1000)
        return () => clearInterval(intervalID)

    }, [context])
    const totalSeconds = mode === ModeType.Working
        ? context.workMinutes * MINUTE_IN_SECONDS
        : context.breakMinutes * MINUTE_IN_SECONDS
    const percentage = Math.round(secondsLeft / totalSeconds * 100)

    const minutes = Math.floor(secondsLeft / MINUTE_IN_SECONDS)
    let seconds = (secondsLeft % MINUTE_IN_SECONDS).toString()
    if (parseInt(seconds) < 10) seconds = "0" + seconds
    return (
        <div className={styles.home}>
            <div>
                <h1>Welcome to Super Pomodoro!</h1>
                <ProgressBar styles={{pathColor: mode === ModeType.Working ? red : green}} totalTime={percentage}
                             text={`${minutes}:${seconds}`}/>
                <div>{isPause ? <PlayButton onClick={() => {
                    setIsPause(false)
                    isPauseRef.current = false
                }}/> : <PauseButton onClick={() => {
                    setIsPause(true)
                    isPauseRef.current = true
                }}/>}</div>
                <div>
                    {context.workMinutes}
                    <div>
                        <SettingsButton onClick={() => {
                            setSettings(!settings)
                        }}/>
                        {settings && <Settings/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;