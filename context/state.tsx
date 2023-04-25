import React, {createContext, PropsWithChildren, useReducer, useState} from "react";

enum ModeType {
    Working = 1,
    Break,
}
interface InitialStateType {
    secondsLeft:number;
    breakMinutes: number;
    workMinutes: number;
    mode: ModeType
}

const initialState = {
    secondsLeft:25*60,
    breakMinutes:5,
    workMinutes:25,
    mode:ModeType.Working
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
    SetBreakMinutes
}

type PomodoroActions = {
    type: ActionType;
    payload?: number;
}
const reducer =  (state:InitialStateType, action:PomodoroActions):InitialStateType =>{
    switch (action.type) {
        case ActionType.Tick: {
            return {...state,secondsLeft:state.secondsLeft-1}
        }
        case ActionType.NextMode: {
            let secondsLeft=0;
            if (action.payload === ModeType.Break){
                secondsLeft = initialState.breakMinutes * 60
            }
            if (action.payload === ModeType.Working){
                secondsLeft = initialState.workMinutes * 60
            }
            return {...state,secondsLeft,mode:action.payload as ModeType}
        }
        case ActionType.SetWorkMinutes: {
            return {...state,workMinutes:action.payload as number}
        }
        case ActionType.SetBreakMinutes: {
            return {...state,breakMinutes:action.payload as number}
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
