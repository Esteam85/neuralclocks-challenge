import styles from "./home.module.scss"
import ProgressBar from "components/progressbar";
import PlayButton from "components/playbutton";
import PauseButton from "components/pausebutton";
import Settings from "components/settings";
import {useContext, useState} from "react";
import SettingsButton from "components/settingsbutton";
import {PomodoroContext} from "context/state";

const Home = () => {
    const [settings, setSettings] = useState(true)
    const context = useContext(PomodoroContext)
    return (
        <div className={styles.home}>
            <div>
            <h1>Welcome to Pomodoro!</h1>
                <ProgressBar totalTime={context.workMinutes}/>
                <div><PlayButton/><PauseButton/></div>
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