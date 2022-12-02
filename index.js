async function getWeather(place) {
    const weather = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + place + '&APPID=a90f7f24de656de7768b5f7316386e7b', {mode: 'cors'})
    const makeWeather = await weather.json();
    const selectedWeather = createWeatherObj(makeWeather)
    const cleanedWeather = cleanWeather(selectedWeather)
    displayWeather(cleanedWeather)
    console.log(makeWeather)
}

const createWeatherObj = (obj) => {
    const name = obj.name
    const temperature = obj.main.temp;
    const humidity = obj.main.humidity;
    const feelsLike = obj.main.feels_like;
    const weather = obj.weather[0].description;
    return {name, temperature, humidity, feelsLike, weather}
}


document.querySelector('.submit').addEventListener('click', () => {
    const place = document.querySelector('#place').value;
    getWeather(place)
})


const displayWeather = (obj) => {
    const name = document.createElement('div');
    name.textContent = obj.name;
    name.classList = 'wdisplay'
    name.setAttribute('id', 'name')
    const weather = document.createElement('div');
    weather.textContent = obj.weather;
    weather.classList = 'wdisplay'
    const temperature = document.createElement('div');
    temperature.textContent = obj.temperature + '°F';
    temperature.classList = 'wdisplay'
    const humidity = document.createElement('div');
    humidity.textContent = 'Humidity: ' + obj.humidity + '%';
    humidity.classList = 'wdisplay'
    const feelsLike =  document.createElement('div');
    feelsLike.textContent = 'Feels like ' + obj.feelsLike;
    feelsLike.classList = 'wdisplay'

    const container = document.querySelector('.container')

    removeOld();

    container.appendChild(name)
    container.appendChild(weather)
    container.appendChild(temperature)
    container.appendChild(humidity)
    container.appendChild(feelsLike)
}

const removeOld = () => {
    document.querySelectorAll('.wdisplay').forEach(item => {
        item.remove()
    })
}

const cleanWeather = (obj) => {
    obj.temperature = Math.round((obj.temperature - 273.15) * 9/5 + 32)
    obj.feelsLike = Math.round((obj.feelsLike - 273.15) * 9/5 + 32)

    obj.weather = obj.weather[0].toUpperCase() + obj.weather.substring(1)
    
    return obj
}