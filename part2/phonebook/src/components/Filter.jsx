const Filter = (props) => {
  return (
      <div>Filter shown with
            <input type="text" value={props.newFilter} onChange={props.onChange}/>
      </div>
    )
} 
export default Filter