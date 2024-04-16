const body = document.querySelector('body')

// Assets
import clear from '../assets/images/clear.jpg';
import clouds from '../assets/images/clouds.jpeg';
import mist from '../assets/images/mist.jpg';
import rain from '../assets/images/rain.jpg';
import snow from '../assets/images/snow.jpg';
import sunny from '../assets/images/sunny.jpg';
import thunder from '../assets/images/thunder.jpg';

export const fetchWeather = (city) => {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=550f2bc9f0aa46b5945111518231412&q=${city}&days=3`
    )
    .then((response) => {
        return response.json()
    })

    .then((data) => {
        const { name } = data.location
        const { text: forecast } = data.current.condition
        const { temp_c, wind_kph, feelslike_c, uv } = data.current
        const { daily_chance_of_rain } = data.forecast.forecastday[0].day
        const { avgtemp_c: avgtemp_c } = data.forecast.forecastday[1].day
        const { avgtemp_c: avgtemp_c2 } = data.forecast.forecastday[2].day

        // Rounding off number for better usability
        const avgtempTomorrow = Math.floor(avgtemp_c)
        const avgtempDay3 = Math.floor(avgtemp_c2)
        const feelsLike = Math.floor(feelslike_c)

        // Changing body background img depending on forecast
        switch (data.current.condition.text) {
            default: // Clear conditions
                body.style.backgroundImage = `url(${clear})`;
            break;
            case 'Cloudy':
            case 'Partly cloudy':
            case 'Overcast':
                body.style.backgroundImage = `url(${clouds})`;
            break;
            case 'Light rain':
            case 'Light drizzle':
            case 'Rain':
                body.style.backgroundImage = `url(${rain})`;
            break;
            case 'Thunder':
                body.style.backgroundImage = `url(${thunder})`;
            break;
            case 'Sunny':
                body.style.backgroundImage = `url(${sunny})`;
            break;
            case 'Mist':
                body.style.backgroundImage = `url(${mist})`;
            break;
            case 'Light snow':
            case 'Light sleet':
            case 'Snowy':
                body.style.backgroundImage = `url(${snow})`;
            break;
        }

    return {
        name,
        forecast,
        temp_c,
        wind_kph,
        avgtempTomorrow,
        avgtempDay3,
        feelsLike,
        uv,
        daily_chance_of_rain
    }
    })
}
