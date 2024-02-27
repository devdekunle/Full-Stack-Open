import Input from './Input'

const PersonForm = (props) => {
  return (
      <form onSubmit={props.onSubmit}>
          <Input type="name" value={props.newName} handleChange={props.handleNameChange}/>
          <Input type="number" value={props.newNumber} handleChange={props.handleNumberChange}/>
          <div>
            <button type='submit'>add</button>
          </div>
      </form>
    )
}
export default PersonForm