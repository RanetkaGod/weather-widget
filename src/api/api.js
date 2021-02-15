import api_key from "@/api/apiKey";
import axios from "axios"

let api_url = "http://api.openweathermap.org/data/2.5/weather?appid=" + api_key + '&units=metric'
let serialized_weather = []


async function getWeather(locations) {
    serialized_weather = []
    let locations_promises = locations.map((location) => {
        return getWeatherByCoords(location.latitude, location.longitude)
    })
    Promise.all(locations_promises).then(responses => {
        responses.forEach(response => {
            serializeWeatherObject(response)
        })
    })
    return serialized_weather
}

async function getWeatherByCoords(latitude, longitude) {
    return await axios.get(api_url, {
        params: {
            lat: latitude,
            lon: longitude
        }
    })
}

async function getWeatherByLocationName(name) {
    return await axios.get(api_url, {
        params: {
            q: name
        }
    })
}

async function getApiLocationName(name) {
    try {
        const weather = await getWeatherByLocationName(name)
        return {
            latitude: weather.data.coord.lat,
            longitude: weather.data.coord.lon,
            name: weather.data.name
        }

    } catch (e) {
        return e
    }
}

function serializeWeatherObject(weather) {
    serialized_weather.push({
        location_name: weather.data.name,
        country: weather.data.sys.country,
        temp: weather.data.main.temp,
        feels_like: weather.data.main.feels_like,
        description: weather.data.weather[0].description,
        wind_speed: weather.data.wind.speed,
        wind_deg: weather.data.wind.deg,
        pressure: weather.data.main.pressure,
        humidity: weather.data.main.humidity,
        visibility: weather.data.visibility / 1000,
        weather_type: weather.data.weather[0].icon
    })
}

export {getWeather, getApiLocationName}