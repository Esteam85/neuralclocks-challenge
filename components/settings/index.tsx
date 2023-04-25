import React, {FC, useContext} from "react";
import {ActionType,PomodoroContext} from "context/state";
import styles from "./settings.module.scss"


const Settings: FC = () => {
    const {state,dispatch} = useContext(PomodoroContext);
    return (
        <div role="settings" className={styles.settings}>
            <div>Work Minutes
                <input
                    type="number"
                    min={15}
                    max={25}
                    defaultValue={25}
                    value={state.workMinutes}
                    onChange={(e) => {
                        dispatch({type:ActionType.SetWorkMinutes,payload:parseInt(e.target.value)})
                    }}
                />
            </div>
            <div>
                Break Minutes
                <input
                    type="number"
                    min={5}
                    max={25}
                    defaultValue={5}
                    value={state.breakMinutes}
                    onChange={(e) => {
                        dispatch({type:ActionType.SetBreakMinutes,payload:parseInt(e.target.value)})
                    }}
                />
            </div>
        </div>
    )
}

export default Settings