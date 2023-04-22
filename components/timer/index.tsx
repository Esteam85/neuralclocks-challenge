import { useState, useEffect } from "react";

interface PomodoroTimerProps {
  pomodoroLength?: number;
  breakLength?: number;
}

const PomodoroTimer = ({
  pomodoroLength = 25,
  breakLength = 5,
}: PomodoroTimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(pomodoroLength * 60);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setIsBreak((isBreak) => !isBreak);
      setTimeLeft(isBreak ? breakLength * 60 : pomodoroLength * 60);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft, isBreak, pomodoroLength, breakLength]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const timerLabel = isBreak ? "Break" : "Pomodoro";

  return (
    <div>
      <h1>{timerLabel}</h1>
      <p>
        {minutes}:{seconds}
      </p>
      <button onClick={() => setIsRunning((isRunning) => !isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={() => setTimeLeft(pomodoroLength * 60)}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;
