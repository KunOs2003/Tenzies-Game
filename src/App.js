import { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [notYet, setNotYet] = useState(false)
  const diceElements = dice.map(item => {
      return(<Die notYet={notYet} isHeld = {item.isHeld} num={item.value} onClick={() => holdDice(item.id)}/>)
    })

  /* Comparing states */
  useEffect(() => {
    let x
    dice.map(item => {
      if(item.isHeld === false){
        x = item.value
        return x
      }else{
        return item
      }
    })
    if(dice.every(element => element.isHeld === false)){
      if(dice.every(element => element.value === x)){
        setTenzies(true)
      }else{
        setNotYet(true)
      }
    }
  },[dice])

  /*1 Create Dice Number */
  function allNewDice() {
    const array = []
    for(let i=1;i<11;i++){
      array.push({
        value : Math.floor(Math.random()*6)+1,
        isHeld : true,
        id : nanoid()
      })
    }
    return array
  }

  /*5 Rolling Dice */
  function rollDice() {
    setDice(prevState => prevState.map(item => {
        return !item.isHeld ?
         item : 
         {
          value : Math.floor(Math.random()*6)+1,
          isHeld : true,
          id : nanoid()
        }
      })
    )
  }

  /*4 Change Dice Color */
  function holdDice(id) {
    const dieElements = dice.map(item => {
      if(item.id === id){
        return {...item,isHeld:!item.isHeld}
      }
      return item
    })
    setDice(dieElements)
    setNotYet(false)
  }
  

  return (
    <main className="App">
      {!tenzies&&<>
        <h3 className="game--title">Tenzies</h3>
        <span className="creator--span">By KUN Oussama</span>
        <h5 className="game--description">Roll until All dice are the same, Click each die to freeze it</h5></>}
      <div className="dice-container">
        {tenzies?<h2 className="win--title">YOU WIN</h2>:diceElements}
      </div>
      {tenzies?<button className="roll--dice" onClick={() => {
        setTenzies(false)
        setDice(allNewDice())
        }}>Play Again</button>:<button className="roll--dice" onClick={rollDice}>ROLL</button>}
    </main>
  );
}

export default App;
