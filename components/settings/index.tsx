import React, {FC, useContext} from "react";
import {PomodoroContext} from "context/state";

const Settings: FC = () => {
    const { workMinutes, setWorkMinutes } = useContext(PomodoroContext);
    return (
        <div>
            <input
                type="number"
                value={workMinutes}
                onChange={(e) => {setWorkMinutes(parseInt(e.target.value))}}
            />
        </div>
    )
}

export default Settings