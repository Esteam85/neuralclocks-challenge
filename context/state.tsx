import React, {createContext, PropsWithChildren, useReducer, useState} from "react";
import {
    ActionType,
    initialState,
    InitialStateType,
    MINUTE_IN_SECONDS,
    ModeType,
    PomodoroActions,
    TotalSecondsMap
} from "@/context/types";

export const PomodoroContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

const reducer = (state: InitialStateType, action: PomodoroActions): InitialStateType => {
    switch (action.type) {
        case ActionType.Tick: {
            return {...state, secondsLeft: state.secondsLeft - 1}
        }
        case ActionType.NextMode: {
            if (state.currentMode === ModeType.Working && state.pomodoroCount > 1) {
                const secondsLeft = state.breakMinutes * MINUTE_IN_SECONDS
                return {...state, secondsLeft, currentMode: ModeType.Break, pomodoroCount: state.pomodoroCount - 1}
            }
            if (state.currentMode === ModeType.Working && state.pomodoroCount === 1) {
                const secondsLeft = state.longBreakMinutes * MINUTE_IN_SECONDS
                return {...state, secondsLeft, currentMode: ModeType.LongBreak, pomodoroCount: state.pomodoroCount - 1}
            }
            if (state.currentMode === ModeType.Break) {
                const secondsLeft = state.workMinutes * MINUTE_IN_SECONDS
                return {...state, secondsLeft, currentMode: ModeType.Working}
            }

            if (state.currentMode === ModeType.LongBreak) {
                const secondsLeft = state.workMinutes * MINUTE_IN_SECONDS
                return {...state, secondsLeft, currentMode: ModeType.Working, pomodoroCount: initialState.pomodoroCount}
            }
            return state
        }
        case ActionType.SetFastMode: {
            const ticksMilliseconds = action.payload ? 10 : initialState.ticksMilliseconds
            return {...state, fastModeOn: action.payload as boolean, ticksMilliseconds}
        }
        case ActionType.SetBreakMinutes: {
            let secondsLeft = state.secondsLeft
            const payloadInSecs = action.payload * MINUTE_IN_SECONDS
            if (state.currentMode == ModeType.Break) secondsLeft = payloadInSecs

            TotalSecondsMap[ModeType.Break] = payloadInSecs
            return {...state, secondsLeft, breakMinutes: action.payload as number}
        }
        case ActionType.SetWorkMinutes: {
            let secondsLeft = state.secondsLeft
            const payloadInSecs = action.payload * MINUTE_IN_SECONDS
            if (state.currentMode == ModeType.Working) secondsLeft = payloadInSecs

            TotalSecondsMap[ModeType.Working] = payloadInSecs
            return {...state, secondsLeft, workMinutes: action.payload as number}
        }
        case ActionType.SetLongBreakMinutes: {
            let secondsLeft = state.secondsLeft
            const payloadInSecs = action.payload * MINUTE_IN_SECONDS
            if (state.currentMode == ModeType.LongBreak) secondsLeft = payloadInSecs

            TotalSecondsMap[ModeType.LongBreak] = payloadInSecs
            return {...state, secondsLeft, longBreakMinutes: action.payload as number}
        }
        case ActionType.SetPause: {
            return {...state, isPause: action.payload as boolean}
        }
        case ActionType.Reset: {
            TotalSecondsMap[ModeType.Working] = initialState.workMinutes * MINUTE_IN_SECONDS
            TotalSecondsMap[ModeType.Break] = initialState.breakMinutes * MINUTE_IN_SECONDS
            TotalSecondsMap[ModeType.LongBreak] = initialState.longBreakMinutes * MINUTE_IN_SECONDS
            return {...state, ...initialState}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}
export const PomodoroProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <PomodoroContext.Provider value={{state, dispatch}}>
            {children}
        </PomodoroContext.Provider>
    );
};
