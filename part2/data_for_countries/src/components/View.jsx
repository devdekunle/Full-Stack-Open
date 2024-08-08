import axios from 'axios'

const openWeatherAPIKEY = import.meta.env.OPEN_WEATHER_API_KEY;
const View = ({ countriesToShow }) => {

	const weatherData = (capital) => {
		axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${openWeatherAPIKEY}`)
		.then(response => {
			return response.data
		})
		.catch(error => {
			console.log("Error fecthing weather data", error.message);
		})
	}
	return(
		countriesToShow.map(country => {
			return <div key={country.name.common}>
            	<h1>{country.name.common}</h1>
              	<p>capital {country.capital}</p>
              	<p>area {country.area}</p>
              	<h3>languages</h3>
              	{Object.values(country.languages).map(language => <ul key={language}><li>{language}</li></ul>)}
              	<div>{country.flag}</div>
				<h3>Weather in {country.capital}</h3>
				<div>{weatherData(country.capital)}</div>
          	</div>
		})
	)
}


export default View