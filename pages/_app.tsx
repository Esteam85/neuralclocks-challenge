import type {AppProps} from 'next/app'
import {PomodoroProvider} from "context/state";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
export default function App({Component, pageProps}: AppProps) {
    return (
            <PomodoroProvider>
                <Component {...pageProps} />
            </PomodoroProvider>
    )
}
