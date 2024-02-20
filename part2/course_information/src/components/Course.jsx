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

export default Course