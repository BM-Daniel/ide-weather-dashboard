
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
const apiKey = process.env.API_KEY;

export async function getCurrentWeather(req, res) {
    const { location } = req.params;
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;

        if (response.status === 200) {
            const lastUpdate = new Date();
            const currentWeather = weatherData.list[0];
            const subsequentDays = weatherData.list.slice(1);
            const formattedResponse = { 
                lastUpdate,
                currentWeather: {
                    dateTime: new Date(currentWeather.dt_txt),
                    temperature: convertKelvinToCelsius(currentWeather.main.temp),
                    averageDayTemp: convertKelvinToCelsius(currentWeather.main.temp),
                    averageNightTemp: convertKelvinToCelsius(currentWeather.main.temp),
                    humidity: currentWeather.main.humidity,
                    wind: currentWeather.wind.speed,
                    visibility: currentWeather.visibility,
                    airQuality: "Not provided by OpenWeatherMap",
                    uvIndex: "Not provided by OpenWeatherMap",
                },
                subsequentDays: subsequentDays.map(day => ({
                    dateTime: new Date(day.dt_txt),
                    temperature: convertKelvinToCelsius(day.main.temp),
                    humidity: day.main.humidity,
                    averageDayTemp: convertKelvinToCelsius(day.main.temp),
                    averageNightTemp: convertKelvinToCelsius(day.main.temp),
                })),
            };

            console.log(formattedResponse);

            return res.status(200).json(formattedResponse);
        } else {
            return res.status(response.status).json({ error: weatherData.message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function convertKelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}
