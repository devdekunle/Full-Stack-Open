import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const array = new Uint8Array(8)
  const [votes, setVotes] = useState(array)

    const handleChange = () => {
      const randNumber  = Math.floor(Math.random() * anecdotes.length)
        setSelected(randNumber)
    }
    const handleVotes = () => {
         setVotes(prevVotes => {
            const copy = [...prevVotes]
            copy[selected] = prevVotes[selected] + 1
            return copy
         })
    }
    let maxIndex
    for (let i=0; i < votes.length; i++) {
        if (votes[i] === Math.max(...votes)) maxIndex = i
    }
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleChange}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {Math.max(...votes)} votes</p>
    </div>
  )
}

export default App
