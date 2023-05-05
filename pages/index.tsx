import styles from "./home.module.scss"
import Head from 'next/head';
import ProgressBar from "components/progressbar";
import Settings from "components/settings";
import {FC, useContext, useEffect, useState} from "react";
import {PomodoroContext} from "context/state";
import {PauseButton, PlayButton, SettingsButton} from "@/components/buttons";
import {ActionType, MINUTE_IN_SECONDS, ModeMap, ModeMapEmoji, ModeType, TotalSecondsMap} from "@/context/types";

const workingColor = '#EA3368';
const breakColor = '#4aec8c';

const Home: FC = () => {
    const {state, dispatch} = useContext(PomodoroContext)
    const [settings, setSettings] = useState(false)

    useEffect(() => {
        const intervalID = setInterval(() => {
            if (state.isPause) {
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
    const percentage = Math.round(state.secondsLeft / TotalSecondsMap[state.currentMode] * 100)
    const minutes = Math.floor(state.secondsLeft / MINUTE_IN_SECONDS)
    let seconds = (state.secondsLeft % MINUTE_IN_SECONDS).toString()
    if (parseInt(seconds) < 10) seconds = "0" + seconds
    const timeText = `${minutes}:${seconds}`
    const title=`${timeText}${state.isPause ? '⏸️' : ''}${ModeMapEmoji[state.currentMode]}`
    return (
        <div className={styles.home}>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <h1>Esteam Pomodoro <div className={styles.tomato}>🍅</div></h1>
                <div className={styles.timer}>
                    <h2>Pomodoros left {state.pomodoroCount} {ModeMap[state.currentMode]}</h2>
                    <ProgressBar
                        styles={{pathColor: state.currentMode === ModeType.Working ? workingColor : breakColor}}
                        totalTime={percentage}
                        text={timeText}/>
                    <div className={styles.buttons}>
                        {
                            state.isPause
                                ? <PlayButton onClick={() => {
                                    dispatch({type: ActionType.SetPause, payload: false})
                                }}/>
                                : <PauseButton onClick={() => {
                                    dispatch({type: ActionType.SetPause, payload: true})
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