import React, {FC, useContext} from "react";
import {ActionType, PomodoroContext} from "context/state";
import Switch from "react-switch";
import styles from "./settings.module.scss"


const Settings: FC = () => {
    const {state, dispatch} = useContext(PomodoroContext);
    return (
        <div role="settings" className={styles.settings}>
            <div>Work Minutes
                <input
                    type="number"
                    min={15}
                    max={25}
                    value={state.workMinutes}
                    onChange={(e) => {
                        dispatch({type: ActionType.SetWorkMinutes, payload: parseInt(e.target.value)})
                    }}
                />
            </div>
            <div>
                Break Minutes
                <input
                    type="number"
                    min={5}
                    max={25}
                    value={state.breakMinutes}
                    onChange={(e) => {
                        dispatch({type: ActionType.SetBreakMinutes, payload: parseInt(e.target.value)})
                    }}
                />
            </div>
            <div className={styles.fastmode}>
                <p>Fast Mode
                    (1 sec = 10 millisec)
                </p>
                <div className={styles.switch}>

                    <Switch
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                        onColor={"#EA3368"} onChange={(e) => {
                        dispatch({type: ActionType.SetFastMode, payload: !state.fastModeOn})
                    }} checked={state.fastModeOn}/>
                </div>
            </div>
        </div>
    )
}

export default Settings