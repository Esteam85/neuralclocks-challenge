import React, {FC, useContext} from "react";
import {PomodoroContext} from "context/state";
import styles from "./settings.module.scss"

const Settings: FC = () => {
    const {workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes} = useContext(PomodoroContext);
    if (!workMinutes) {
        setWorkMinutes(0)
    }
    if (!breakMinutes) {
        setBreakMinutes(0)
    }
    return (
        <div role="settings" className={styles.settings}>
            <div className={styles.work}>Work Minutes
                <input
                    type="number"
                    min={15}
                    max={25}
                    defaultValue={25}
                    value={workMinutes}
                    onChange={(e) => {
                        setWorkMinutes(parseInt(e.target.value))
                    }}
                />
            </div>
            <div className={styles.break}>
                Break Minutes
                <input
                    type="number"
                    min={5}
                    max={25}
                    defaultValue={5}
                    value={breakMinutes}
                    onChange={(e) => {
                        setBreakMinutes(parseInt(e.target.value))
                    }}
                />
            </div>
        </div>
    )
}

export default Settings