import { useState } from "react"
import "./App.css"
import Highlight from "./components/Highlight"
import TaskSwitcher from "./components/TaskSwitcher"
import Time from "./components/Time"

const App = () => {
  const [task, setTask] = useState("1")

  const handler = (e: any) => {
    setTask(e.target.value)
  }

  return (
    <>
      <TaskSwitcher task={task} onChangeHandler={handler} />

      {task == "1" && <Time />}

      {task == "2" && <Highlight />}

      {task == "3" && <>Task 3</>}
    </>
  )
}

export default App
