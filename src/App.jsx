import React, { useState } from "react";

import AddColumn from "./components/AddColumn";
import AddCard from "./components/AddCard";
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

  const [ card, setCard] = useState([
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
  let quantidade2 = card.length


  const handleColumn = (taskTitle) => {
    const newColumn = [ ...tasks, {
      id: quantidade,
      title: taskTitle
    }]
    setTasks(newColumn)
    setDisplay('none')
  }
  const handleCard = (cardTitle) => {
    const newCard = [ ...card, {
      id: quantidade2,
      title: cardTitle
    }]
    setCard(newCard)
    setDisplay('none')
  }


  const [display, setDisplay] = useState('none')
  const handleClick = () =>{
    setDisplay('block')
  }
  const [display2, setDisplay2] = useState('none')
  const handleClick2 = () =>{
    setDisplay2('block')
  }

  return (
    <>
      <Header />
      <div className="App">
        <AddColumn display={display} handleColumn={handleColumn} />
        <AddCard display={display2} handleCard={handleCard} />
        <Tasks onClick={handleClick2} card={card} tasks={tasks}/>
        <Button onClick={handleClick}>+</Button>
      </div>
      <Global />

    </>
    
  ); 
}

export default App;
