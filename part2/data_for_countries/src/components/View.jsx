const View = ({ countriesToShow }) => {
	return(
		countriesToShow.map(country => {
			return <div key={country.name.common}>
            	<h1>{country.name.common}</h1>
              	<p>capital {country.capital}</p>
              	<p>area {country.area}</p>
              	<h3>languages</h3>
              	{Object.values(country.languages).map(language => <ul key={language}><li>{language}</li></ul>)}
              	<div>{country.flag}</div>
          	</div>
		})
	)
}


export default View