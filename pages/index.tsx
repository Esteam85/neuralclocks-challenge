import styles from "./home.module.scss"
import Head from 'next/head';
import ProgressBar from "components/progressbar";
import Settings from "components/settings";
import {FC, useContext, useEffect, useRef, useState} from "react";
import {ModeMap, ModeType, ActionType, PomodoroContext, ModeMapEmoji} from "context/state";
import {PauseButton, PlayButton, SettingsButton} from "@/components/buttons";

const MINUTE_IN_SECONDS = 60
const workingColor = '#EA3368';
const breakColor = '#4aec8c';

const Home: FC = () => {
    const {state, dispatch} = useContext(PomodoroContext)
    const [settings, setSettings] = useState(false)
    const [isPause, setIsPause] = useState(true)

    const isPauseRef = useRef(isPause)
    useEffect(() => {
        const intervalID = setInterval(() => {
            if (isPauseRef.current) {
                return;
            }

            if (state.secondsLeft === 0) {
                dispatch({type: ActionType.NextMode})
                return;
            }

            dispatch({type: ActionType.Tick})
        }, state.ticksMilliseconds)
        return () => clearInterval(intervalID)

    }, [state, dispatch])

    const totalSeconds = state.currentMode === ModeType.Working
        ? state.workMinutes * MINUTE_IN_SECONDS
        : state.breakMinutes * MINUTE_IN_SECONDS
    const percentage = Math.round(state.secondsLeft / totalSeconds * 100)

    const minutes = Math.floor(state.secondsLeft / MINUTE_IN_SECONDS)
    let seconds = (state.secondsLeft % MINUTE_IN_SECONDS).toString()
    if (parseInt(seconds) < 10) seconds = "0" + seconds
    const text = `${minutes}:${seconds}`
    return (
        <div className={styles.home}>
            <Head>
                <title>{isPause ? '⏸️' : ''}{ModeMapEmoji[state.currentMode]}{text}</title>
            </Head>
            <div>
                <h1>NeuralClocks <div className={styles.tomato}>🍅</div></h1>
                <div className={styles.timer}>
                    <h2>{ModeMap[state.currentMode]}</h2>
                    <ProgressBar
                        styles={{pathColor: state.currentMode === ModeType.Working ? workingColor : breakColor}}
                        totalTime={percentage}
                        text={text}/>
                    <div className={styles.buttons}>
                        {
                            isPause
                                ? <PlayButton onClick={() => {
                                    setIsPause(false)
                                    isPauseRef.current = false
                                }}/>
                                : <PauseButton onClick={() => {
                                    setIsPause(true)
                                    isPauseRef.current = true
                                }}/>
                        }
                        <SettingsButton onClick={() => {
                            setSettings(!settings)
                        }}/>
                    </div>
                    <div>
                        {settings && <Settings/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;