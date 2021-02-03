import api_key from "@/api/apiKey";
import axios from "axios"

let api_url = "http://api.openweathermap.org/data/2.5/weather?appid=" + api_key + '&units=metric'

async function getWeatherByCoords(locations) {
    let serialized_weather = []
    for (const location of locations) {
        let weather = await axios.get(api_url, {
            params: {
                lat: location.latitude,
                lon: location.longitude
            }
        })
        serialized_weather.push({
            location_name: weather.data.name,
            temp: weather.data.main.temp,
            feels_like: weather.data.main.feels_like,
            description: weather.data.weather[0].description,
            wind_speed: weather.data.wind.speed,
            wind_deg: weather.data.wind.deg,
            pressure: weather.data.main.pressure,
            humidity: weather.data.main.humidity,
            visibility: weather.data.visibility / 1000,
            weather_type: weather.data.weather[0].icon
            // + название локи по кордам
        })
    }
    console.log(serialized_weather)
    return serialized_weather
}

export {getWeatherByCoords}