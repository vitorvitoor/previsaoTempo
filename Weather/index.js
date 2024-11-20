async function fetchWeather() {
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value.trim();
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');

    if (!cityName) {
        errorMessage.textContent = "Por favor, insira o nome de uma cidade.";
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        return;
    }

    try {
        const apiKey = "12b511070505b9000368cd1aaa5682bd";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error("Cidade não encontrada");
        }

        const cityNameElement = document.getElementById('city-name');
        const temperatureElement = document.getElementById('temperature');
        const descriptionElement = document.getElementById('description');
        const locationDetailsElement = document.getElementById('location-details');
        const iconElement = document.getElementById('weather-icon');

        cityNameElement.textContent = data.name;
        temperatureElement.textContent = `${data.main.temp}°C`;
        descriptionElement.textContent = data.weather[0].description;
        locationDetailsElement.textContent = data.sys.country;
        iconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

        cityInput.value = '';
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
    }
}

document.getElementById('search-button').addEventListener('click', fetchWeather);
