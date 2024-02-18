import { React, useState } from 'react'

const StatisticLine = (props) => {
    if(props.text === 'positive') {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>{props.text}</td>
                        <td>{props.value}%</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    return (
            <table>
                <tbody>
                    <tr>
                        <td>{props.text}</td>
                        <td>{props.value}</td>
                    </tr>
                </tbody>
            </table>
    )

}

const Statistics = (props) => {
    const sumFeed = props.stats.good + props.stats.bad + props.stats.neutral
    const avgFeed = sumFeed / 3
    const posFeed = () => {
        if (sumFeed === 0) return 0
        return (props.stats.good / sumFeed) * 100
    }
    return (
      <div>
        <StatisticLine text="good" value ={props.stats.good} />
        <StatisticLine text="neutral" value={props.stats.neutral} />
        <StatisticLine text="bad" value ={props.stats.bad} />
        <StatisticLine text="all" value={sumFeed} />
        <StatisticLine text="average" value={avgFeed} />
        <StatisticLine text="positive" value={posFeed()} />
    </div>
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
    const stats = {
        good: good,
        bad: bad,
        neutral: neutral
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
            <Statistics stats={stats}/>
        </div>
    )
}
export default App
