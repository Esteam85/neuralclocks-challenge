import styles from "./home.module.scss"
import Head from 'next/head';
import ProgressBar from "components/progressbar";
import Settings from "components/settings";
import {useContext, useEffect, useRef, useState} from "react";
import {ActionType, PomodoroContext} from "context/state";
import {PauseButton, PlayButton, SettingsButton} from "@/components/buttons";


const MINUTE_IN_SECONDS = 60
const workingColor = 'rgb(234,51,104)';
const breakColor = '#4aec8c';

enum ModeType {
    Working = 1,
    Break,
}

const Home = () => {
    const [settings, setSettings] = useState(false)
    const [isPause, setIsPause] = useState(true)
    const {state,dispatch} = useContext(PomodoroContext)

    const isPauseRef = useRef(isPause)
    function tick() {
        dispatch({type:ActionType.Tick})
    }

    useEffect(() => {
        function switchMode() {
            const nextMode = state.mode === ModeType.Working ? ModeType.Break : ModeType.Working
            const nextSeconds = (nextMode === ModeType.Working ? state.workMinutes : state.breakMinutes) * MINUTE_IN_SECONDS
            dispatch({type:ActionType.NextMode,payload:nextMode})
        }

        const intervalID = setInterval(() => {
            if (isPauseRef.current) {
                return;
            }

            if (state.secondsLeft === 0) {
                return switchMode()
            }

            tick()
        }, 10)
        return () => clearInterval(intervalID)

    }, [state])

    const totalSeconds = state.mode === ModeType.Working
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
                <title>{isPause ? '⏸️' : ''}{state.mode === ModeType.Working ? '👨‍💻' : '💆'}{text}</title>
            </Head>
            <div>
                <h1>NeuralClocks <div className={styles.tomato}>🍅</div></h1>
                <div className={styles.timer}>
                    <ProgressBar styles={{pathColor: state.mode === ModeType.Working ? workingColor : breakColor}}
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