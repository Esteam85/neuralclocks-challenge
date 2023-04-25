import React, {createContext, PropsWithChildren, useReducer, useState} from "react";

export enum ModeType {
    Working = 1,
    Break,
}

export const ModeMapEmoji: Record<ModeType, string> = {
    [ModeType.Working]: "👨‍💻",
    [ModeType.Break]: "💆"
}

export const ModeMap: Record<ModeType, string> = {
    [ModeType.Working]: "👨‍💻Working",
    [ModeType.Break]: "💆Short Break",
}

interface InitialStateType {
    secondsLeft: number;
    breakMinutes: number;
    workMinutes: number;
    currentMode: ModeType,
    fastModeOn: boolean,
    ticksMilliseconds: number
}

const initialState = {
    secondsLeft: 25 * 60,
    breakMinutes: 5,
    workMinutes: 25,
    currentMode: ModeType.Working,
    fastModeOn: false,
    ticksMilliseconds: 1000

}
export const PomodoroContext = createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

export enum ActionType {
    Tick = 1,
    NextMode,
    SetWorkMinutes,
    SetBreakMinutes,
    SetFastMode
}

type PomodoroActions = {
    type: ActionType;
    payload?: any;
}
const reducer = (state: InitialStateType, action: PomodoroActions): InitialStateType => {
    switch (action.type) {
        case ActionType.Tick: {
            return {...state, secondsLeft: state.secondsLeft - 1}
        }
        case ActionType.NextMode: {
            let secondsLeft = initialState.secondsLeft;
            let currentMode: ModeType = initialState.currentMode;
            if (state.currentMode === ModeType.Break) {
                currentMode = ModeType.Working
                secondsLeft = initialState.workMinutes * 60
            }
            if (state.currentMode === ModeType.Working) {
                currentMode = ModeType.Break
                secondsLeft = initialState.breakMinutes * 60
            }
            return {...state, secondsLeft, currentMode}
        }
        case ActionType.SetFastMode: {
            const ticksMilliseconds = action.payload ? 10 : initialState.ticksMilliseconds
            return {...state, fastModeOn: action.payload as boolean, ticksMilliseconds}
        }
        case ActionType.SetBreakMinutes: {
            const secondsLeft = action.payload * 60
            return {...state, secondsLeft, breakMinutes: action.payload as number}
        }
        case ActionType.SetWorkMinutes: {
            const secondsLeft = action.payload * 60
            return {...state, secondsLeft, workMinutes: action.payload as number}
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
