
export const MINUTE_IN_SECONDS = 60

export enum ModeType {
    Working = 1,
    Break,
    LongBreak
}

export const ModeMapEmoji: Record<ModeType, string> = {
    [ModeType.Working]: "👨‍💻",
    [ModeType.Break]: "💆",
    [ModeType.LongBreak]: "🏖️"
}

export const ModeMap: Record<ModeType, string> = {
    [ModeType.Working]: "👨‍💻Working",
    [ModeType.Break]: "💆Short Break",
    [ModeType.LongBreak]: "🏖Long Break",
}

export interface InitialStateType {
    secondsLeft: number;
    breakMinutes: number;
    longBreakMinutes: number;
    workMinutes: number;
    currentMode: ModeType;
    fastModeOn: boolean;
    ticksMilliseconds: number;
    pomodoroCount: number;
    totalSeconds: number;
    isPause:boolean;
}

export const initialState = {
    secondsLeft: 25 * MINUTE_IN_SECONDS,
    breakMinutes: 5,
    longBreakMinutes: 15,
    workMinutes: 25,
    currentMode: ModeType.Working,
    fastModeOn: false,
    ticksMilliseconds: 1000,
    pomodoroCount: 4,
    totalSeconds: 25 * MINUTE_IN_SECONDS,
    isPause:true
}

export let TotalSecondsMap: Record<ModeType,number> = {
    [ModeType.Working]: initialState.workMinutes * MINUTE_IN_SECONDS,
    [ModeType.Break]: initialState.breakMinutes * MINUTE_IN_SECONDS,
    [ModeType.LongBreak]: initialState.longBreakMinutes * MINUTE_IN_SECONDS,
}


export enum ActionType {
    Tick = 1,
    NextMode,
    SetWorkMinutes,
    SetBreakMinutes,
    SetLongBreakMinutes,
    SetFastMode,
    SetPause,
    Reset
}

export type PomodoroActions = {
    type: ActionType;
    payload?: any;
}