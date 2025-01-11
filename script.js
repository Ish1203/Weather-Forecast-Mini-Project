const apiKey = 'bd5e378503939ddaee76f12ad7a97608'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('searchButton').addEventListener('click', fetchWeather);

function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    alert('City not found');
                    return;
                }
                updateWeatherInfo(data);
                fetchForecast(city);
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }
}

function updateWeatherInfo(data) {
    document.getElementById('cityName').innerText = data.name;
    document.getElementById('weatherDescription').innerText = data.weather[0].description;
    document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
    
    // Update background image based on weather condition
        const weatherCondition = data.weather[0].main;
        const backgroundContainer = document.querySelector('.background-container');
        if (weatherCondition === 'Clear') {
            backgroundContainer.style.backgroundImage = "url('https://img.freepik.com/free-vector/realistic-sun-cloud-sky-composition-with-day-clear-sky-scenery-with-clouds-sun-flares-vector-illustration_1284-83008.jpg')";
        } else if (weatherCondition === 'Clouds') {
            backgroundContainer.style.backgroundImage = "url('https://media.istockphoto.com/id/512218646/photo/storm-sky-rain.jpg?s=612x612&w=0&k=20&c=RoUDM9BMwqW8NkPXjzAzlDKCHPOmdZhmmeT3jGA2EaM=')";
        } else if (weatherCondition === 'Rain') {
            backgroundContainer.style.backgroundImage = "url('https://cdn.wallpapersafari.com/80/79/6JmCqO.jpg')";
        } else {
            backgroundContainer.style.backgroundImage = "url('https://c4.wallpaperflare.com/wallpaper/320/348/955/summer-sunlight-leaves-the-garden-of-words-wallpaper-preview.jpg')";
        }
    }
function fetchForecast(city) {
    fetch(`${apiUrl}forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecastContainer');
            forecastContainer.innerHTML = '';
            data.list.forEach(item => {
                if (item.dt_txt.includes('12:00:00')) { 
                    const forecastItem = document.createElement('div');
                    forecastItem.className = 'forecast-item';
                    forecastItem.innerHTML = `
                        <p>${new Date(item.dt_txt).toLocaleDateString()}</p>
                        <p>${item.weather[0].description}</p>
                        <p>Temp: ${item.main.temp} °C</p>
                    `;
                    forecastContainer.appendChild(forecastItem);
                }
            });
        })
        .catch(error => console.error('Error fetching forecast data:', error));
}
