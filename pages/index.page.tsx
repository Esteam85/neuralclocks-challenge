import PomodoroTimer from "components/timer"
import styles from "styles/styles.module.scss"
const Home = ()=>{
  return (
    <div>
      <h1 className={styles.title}>Hola Timer!</h1>
      <PomodoroTimer/>
      </div>
  )
}

export default Home;