import React, { useState } from "react";

import AddColumn from "./components/AddColumn";
import Button from "./components/Button";
import Tasks from "./components/Tasks";

import './App.css'
import Header from "./components/Header";

import Global from "./styles/global"


function App() {

  const [ tasks, setTasks] = useState([
    {
    id: '0',
    title: 'To do'
  },
  {
    id: '1',
    title: 'In progress'
  },
  {
    id: '2',
    title: 'Done'
  }
  ])

  let quantidade = tasks.length

  const handleColumn = (taskTitle) => {
    const newColumn = [ ...tasks, {
      id: quantidade,
      title: taskTitle
    }]
    setTasks(newColumn)
    setDisplay('none')
  }


  const [display, setDisplay] = useState('none')
  const handleClick = () =>{
    setDisplay('block')
  }

  return (
    <>
      <Header />
      <div className="App">
        <AddColumn display={display} handleColumn={handleColumn} />
        <Tasks tasks={tasks}/>
        <Button onClick={handleClick}>+</Button>
      </div>
      <Global />

    </>
    
  ); 
}

export default App;
