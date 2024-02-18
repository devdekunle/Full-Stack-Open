import { React, useState } from 'react'

const Statistics = (props) => {
        if(props.text === 'positive') {
            return (
                <p>{props.text} {props.stats}%</p>
            )
        }
        return (
            <p>{props.text} {props.stats}</p>
        )
}

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>{props.text}</button>
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
    const sumFeed = good + bad + neutral
    const avgFeed = sumFeed / 3
    const posFeed = () => {
        if (sumFeed === 0) return 0
        return (good / sumFeed) * 100
    }
    if (good === 0 && bad === 0 && neutral === 0) {
        return (
            <div>
            <h2>give feedback</h2>
            <Button text='good' handleClick={handleGood} />
            <Button text='neutral' handleClick={handleNeutral} />
            <Button text='bad' handleClick={handleBad} />
            <h2>Statistics</h2>
            <p>No feedback given</p>
            </div>
        )
    }

    return(
        <div>
            <h2>give feedback</h2>
            <Button text='good' handleClick={handleGood} />
            <Button text='neutral' handleClick={handleNeutral} />
            <Button text='bad' handleClick={handleBad} />
            <h2>Statistics</h2>
            <Statistics text='good' stats={good}/>
            <Statistics text='neutral' stats={neutral}/>
            <Statistics text='bad' stats={bad}/>
            <Statistics text='all' stats={sumFeed}/>
            <Statistics text='average' stats={avgFeed}/>
            <Statistics text = 'positive' stats={posFeed()}/>
        </div>
    )
}
export default App
