// useState: counter

// http://localhost:3000/isolated/exercise/10

import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  // 🐨 use React.useState here
  const [count,setCount] = React.useState(initialCount)
  // 🐨 create an increment function that calls the state updater you get from
  const increment = () => {setCount(c => c + step)}
  //    React.useState to increment the count
  // 🐨 render the count you get from React.useState inside the button and use
  //    your increment function as the onClick handler.
return <button onClick={increment} >{count}</button>
}

function Usage() {
  return <Counter />
}

export default Usage
