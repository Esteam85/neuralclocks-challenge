import React, {createContext, PropsWithChildren, useState} from "react";

interface PomodoroContextInterface {
    workMinutes: number;
    setWorkMinutes: React.Dispatch<React.SetStateAction<number>>;
}

export const PomodoroContext:React.Context<PomodoroContextInterface> = createContext<PomodoroContextInterface>({
    workMinutes: 0,
    setWorkMinutes: () => {
        console.log("hola")
    },
});

export const PomodoroProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [workMinutes, setWorkMinutes] = useState(60);

    return (
        <PomodoroContext.Provider value={{workMinutes, setWorkMinutes}}>
            {children}
        </PomodoroContext.Provider>
    );
};
