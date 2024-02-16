import { React, useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
    )
}
const Display = (props) => {
    return (
        <p>{props.text} {props.count}</p>
    )
}
const App = () => {

    const handleGood = () => {
        setGood(prev => prev + 1)
    }
    const handleNeutral = () => {
        setNeutral(prev => prev + 1)
    }
    const handleBad = () => {
        setBad(prev => prev + 1)
    }

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return(
        <div>
            <h2>give feedback</h2>
            <Button text='good' handleClick={handleGood} />
            <Button text='neutral' handleClick={handleNeutral} />
            <Button text='bad' handleClick={handleBad} />
            <h2>statistic</h2>
            <Display text='good' count={good} />
            <Display text='neutral' count={neutral} />
            <Display text='bad' count={bad} />


        </div>
    )
}
export default App
