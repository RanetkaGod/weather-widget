import api_key from "@/api/apiKey";
import axios from "axios"

let api_url = "http://api.openweathermap.org/data/2.5/weather?appid=" + api_key + '&units=metric'
let serialized_weather = []

async function getWeather(locations) {
    let weather
    for (let location of locations) {
        if (location.latitude && location.longitude) {
            weather = await getWeatherByCoords(location.latitude, location.longitude)
            if (!location.name) {
                location.name = weather.data.name
            }
        }
        if (location.name) {
            weather = await getWeatherByLocationName(location.name)
            console.log(weather)
        } else {
            console.error('Ошибка при получении данных о погоде') // parse error
        }
        serializeWeatherObject(weather)
    }
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
        console.error(e)
    }

}

function serializeWeatherObject(weather) {
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

export {getWeather, getApiLocationName}