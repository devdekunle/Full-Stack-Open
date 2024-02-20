import { useState } from 'react'
import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )

}

const Content = ({ parts, name }) => {
    const mappedParts = parts.map(part => <Part key={part.id} part={part}/>)
    return (
        <> 
            <Header name={name}/>
            {mappedParts}
            <Total parts={parts}/>
        </>
    )

}
const Total = ({parts}) => {
    const totalExercises = parts.reduce((sum, parts) => {
        return sum + parts.exercises
    }, 0)
   return (
        <p>Total of {totalExercises} exercises</p>
    ) 
}
const Course = (props) => {
    const mappedCourses = props.course.map(course => {
        return (
            <Content 
                    key={course.id} 
                    parts={course.parts} 
                    name={course.name}
            />
        )
    })
    return (
        <>
            {mappedCourses}
        </>
        )
    }


const App = () => {
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
    
    return <Course course={courses}/>
}


export default App
