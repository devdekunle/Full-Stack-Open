import View from './View'

const Countries = ({ countriesToShow, handleShowView}) => {
  return (
    <div>
      {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}
      {countriesToShow.length > 1 && countriesToShow.length <= 10 && countriesToShow.map(
        country => {
          return <div key={country.name.common}>
            <p>{country.name.common}</p>
            <button onClick={() => handleShowView(country)}>show</button>
          </div>
        })}
      {countriesToShow.length === 1 &&
        <View 
          countriesToShow={countriesToShow}
        />
      }
    </div>
    )
}

export default Countries