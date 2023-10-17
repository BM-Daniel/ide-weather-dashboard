import axios from 'axios';

const apiKey = 'e0eda471a53089db18d9096cd6da40b6';

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
                    temperature: currentWeather.main.temp,
                    averageDayTemp: currentWeather.main.temp,
                    averageNightTemp: currentWeather.main.temp,
                    humidity: currentWeather.main.humidity,
                    wind: currentWeather.wind.speed,
                    visibility: currentWeather.visibility,
                    airQuality: "Not provided by OpenWeatherMap",
                    uvIndex: "Not provided by OpenWeatherMap",
                },
                subsequentDays: subsequentDays.map(day => ({
                    dateTime: new Date(day.dt_txt),
                    temperature: day.main.temp,
                    humidity: day.main.humidity,
                    averageDayTemp: day.main.temp,
                    averageNightTemp: day.main.temp,
                })),
            };

            console.log(formattedResponse)

            return res.status(200).json(formattedResponse);
        } else {
            return res.status(response.status).json({ error: weatherData.message });
        }
    } catch (error) {
      
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
