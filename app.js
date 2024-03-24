const weatherContainer = document.querySelector(".weather-container")
const search = document.querySelector(".search button")
const weatherInfo = document.querySelector(".weather-info")
const details = document.querySelector(".details")
const notFound = document.querySelector('.not-found')


search.addEventListener('click', () => {
    const key = 'fb80651d525d94ea81f8c66d5c67aa1a'
    const searchCity = document.querySelector('.search input').value.trim()
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${key}`

    if (searchCity === '') return

    fetch(url)
        .then(res => res.json())
        .then(json => {
            if (json.cod === '404') {
                weatherContainer.style.height = '490px'
                weatherInfo.classList.remove('visiblity')
                details.classList.remove('visiblity')
                notFound.classList.add('visiblity')
                return;
            }
            weatherContainer.style.height = '510px'

            weatherInfo.classList.add('visiblity')
            details.classList.add('visiblity')
            notFound.classList.remove('visiblity')
            const img = document.querySelector('.weather-info img')
            const temp = document.querySelector('.weather-info .degrees')
            const min = document.querySelector('.min')
            const max = document.querySelector('.max')
            const wind = document.querySelector('.details .wind .detail-num')
            const realFeel = document.querySelector('.details .real-feel .detail-num')
            const humidity = document.querySelector('.details .humidity .detail-num')
            const cityName = document.querySelector('.weather-info .city-name')

            cityName.innerText = `${json.name}, ${json.sys.country}`

            const forecast = json.weather[0].main
            if ( forecast === 'Clear') {
                img.src = 'images/sun.png'
            } else if (forecast === 'Rain') {
                img.src = 'images/rain.png'
            } else if (forecast === 'Snow') {
                img.src = 'images/snowy(1).png'
            } else if (forecast === 'Clouds') {
                img.src = 'images/cloudy.png'
            } else {
                img.src = 'images/pngwing.com.png'
            }

            temp.innerText = parseInt(json.main.temp) + ' °C'
            min.innerText = 'Min: ' + parseInt(json.main.temp_min) + ' °C'
            max.innerText = 'Max: ' + parseInt(json.main.temp_max) + ' °C'
            wind.innerText = parseInt(json.wind.speed) + ' km/h'
            realFeel.innerText = parseInt(json.main.feels_like) + ' °C'
            humidity.innerText = parseFloat(json.main.humidity) + '%'
        })
        .catch(error => console.log(error))
})

