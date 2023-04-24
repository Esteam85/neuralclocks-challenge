import React, {createContext, PropsWithChildren, useState} from "react";

interface PomodoroContextInterface {
    breakMinutes: number;
    setBreakMinutes: React.Dispatch<React.SetStateAction<number>>;
    workMinutes: number;
    setWorkMinutes: React.Dispatch<React.SetStateAction<number>>;
}

export const PomodoroContext: React.Context<PomodoroContextInterface> = createContext<PomodoroContextInterface>({
    breakMinutes: 0,
    setBreakMinutes: () => {
    },
    workMinutes: 0,
    setWorkMinutes: () => {
    },
});

export const PomodoroProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);

    return (
        <PomodoroContext.Provider value={{workMinutes, setWorkMinutes, breakMinutes, setBreakMinutes}}>
            {children}
        </PomodoroContext.Provider>
    );
};
