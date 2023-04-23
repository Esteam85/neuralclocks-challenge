import type {AppProps} from 'next/app'
import {PomodoroProvider} from "context/state";
export default function App({Component, pageProps}: AppProps) {
    return (
            <PomodoroProvider>
                <Component {...pageProps} />
            </PomodoroProvider>
    )
}
