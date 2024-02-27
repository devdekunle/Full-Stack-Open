const Input = (props) => {
  return (
      <div>
            {props.type}: <input value={props.value} onChange={props.handleChange}/>
      </div>
    )
}
export default Input