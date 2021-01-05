const api = "599ccf01a92ed2dec1ba8009e45c9e5b"

const input = document.querySelector(".search-box");
input.addEventListener("keydown", result);

function result(ev) {
  if (ev.keyCode == 13) {
    getResult(input.value);
    // console.log(ev.keyCode);
  } 
}

function getResult(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`)
  .then(weather => {
      return weather.json()
  }).then(displayResults)
  .catch(err => console.error('Error :', err))
}

function displayResults(weather) {
    // console.log(weather)
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let today = new Date()
    const tagDate = document.querySelector('.location .date')
    tagDate.innerText = getDate(today)

    let temperature = document.querySelector('.current .temperature')
    temperature.innerHTML = `${Math.round(weather.main.temp)} <span>&#176C</span>`

    let description = document.querySelector('.current .weather')
    description.innerText = weather.weather[0].main
}

function getDate(t){
    const justDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const justMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    let day = justDays[t.getDay()]
    let date = t.getDate()
    let month = justMonths[t.getMonth()]
    let year = t.getFullYear()

    return `${day} ${date} ${month} ${year}`
}
