const Person = (props) => {

  return (
      <div>
          {props.toShow.map(person => {
              return( 
                    <div key={person.id}>
                      <p> 
                        {person.name} {person.number}
                      </p>
                      <button onClick={() => props.handleDelete(person.id)}>delete</button>
                    </div>
                    )
          })
                    
          }
      </div>
    )
}
export default Person