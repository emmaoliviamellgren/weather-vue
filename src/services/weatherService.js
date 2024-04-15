
export const fetchWeather = (city) => {
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=550f2bc9f0aa46b5945111518231412&q=${city}&days=3`
    )
    .then((response) => {
        return response.json()
    })

    .then((data) => {
        const { name } = data.location
        const { forecast } = data.current.condition
        const { temp_c, wind_kph, feelslike_c, uv } = data.current
        const { daily_chance_of_rain } = data.forecast.forecastday[0].day
        const { avgtemp_c: avgtemp_c } = data.forecast.forecastday[1].day
        const { avgtemp_c: avgtemp_c2 } = data.forecast.forecastday[2].day

        // Rounding off number for better usability
        const avgtempTomorrow = Math.floor(avgtemp_c)
        const avgtempDay3 = Math.floor(avgtemp_c2)
        const feelsLike = Math.floor(feelslike_c)

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
