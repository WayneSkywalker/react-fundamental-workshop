// useEffect: persistent state

// http://localhost:3000/isolated/exercise/12

import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 
  const [count, setCount] = React.useState(
    Number(window.localStorage.getItem('count') || initialCount)
  )


  React.useEffect(() => {
    window.localStorage.setItem('count', count)
  })

  const increment = () => setCount(c => c + step)
  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `count` in localStorage.
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}

export default Usage
