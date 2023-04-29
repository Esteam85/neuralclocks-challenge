export const DEFAULT_WORKING_MINUTES = 25;
export const DEFAULT_BREAK_MINUTES = 5;
export const DEFAULT_TICKS_MILLISECONDS = 1000;
export const POMODORO_COUNT = 4;
export const DEFAULT_LONG_BREAK_MINUTES = 15;
export const MINUTE_IN_SECONDS = 60

export enum ModeType {
    Working = 1,
    Break,
    LongBreak
}

export const ModeMapEmoji: Record<ModeType, string> = Object.freeze({
    [ModeType.Working]: "👨‍💻",
    [ModeType.Break]: "💆",
    [ModeType.LongBreak]: "🏖️"
})

export const ModeMap: Record<ModeType, string> = Object.freeze({
    [ModeType.Working]: "👨‍💻Working",
    [ModeType.Break]: "💆Short Break",
    [ModeType.LongBreak]: "🏖Long Break",
})

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
    isPause: boolean;
}

export const initialState = {
    secondsLeft: DEFAULT_WORKING_MINUTES * MINUTE_IN_SECONDS,
    breakMinutes: DEFAULT_BREAK_MINUTES,
    longBreakMinutes: DEFAULT_LONG_BREAK_MINUTES,
    workMinutes: DEFAULT_WORKING_MINUTES,
    currentMode: ModeType.Working,
    fastModeOn: false,
    ticksMilliseconds: DEFAULT_TICKS_MILLISECONDS,
    pomodoroCount: POMODORO_COUNT,
    totalSeconds: DEFAULT_WORKING_MINUTES * MINUTE_IN_SECONDS,
    isPause: true
}

export let TotalSecondsMap: Record<ModeType, number> = {
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