const weatherApi = {
    key: '4eb3703790b356562054106543b748b2',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
  };
  
  const searchInputBox = document.getElementById('input-box');
  searchInputBox.addEventListener('keypress', event => {
    if (event.key === 'Enter') getWeatherReport(searchInputBox.value);
  });
  
  function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
      .then(response => response.json())
      .then(showWeatherReport)
      .catch(() => swal("Error", "Could not fetch data", "error"));
  }
  
  function showWeatherReport(weather) {
    if (weather.cod !== 200) {
      swal("Error", weather.message, "error");
      reset();
      return;
    }
    
    const weatherBody = document.getElementById('weather-body');
    weatherBody.style.display = 'block';
    weatherBody.innerHTML = `
      <div class="location-details">
        <div class="city">${weather.name}, ${weather.sys.country}</div>
        <div class="date">${dateManage(new Date())}</div>
      </div>
      <div class="weather-status">
        <div class="temp">${Math.round(weather.main.temp)}&deg;C</div>
        <div class="weather">${weather.weather[0].main} <i class="${getIconClass(weather.weather[0].main)}"></i></div>
        <div class="min-max">${Math.floor(weather.main.temp_min)}&deg;C / ${Math.ceil(weather.main.temp_max)}&deg;C</div>
        <div>Updated: ${getTime(new Date())}</div>
      </div>
      <hr>
      <div class="day-details">Feels like ${weather.main.feels_like}&deg;C | Humidity ${weather.main.humidity}% | Pressure ${weather.main.pressure} mb | Wind ${weather.wind.speed} KMPH</div>
    `;
    changeBg(weather.weather[0].main);
    reset();
  }
  
  function getTime(date) {
    return `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
  }
  
  function dateManage(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} (${days[date.getDay()]}) ${date.getFullYear()}`;
  }
  
  function changeBg(status) {
    const bgImages = {
      'Clouds': 'clouds.jpg',
      'Rain': 'rainy.jpg',
      'Clear': 'clear.jpg',
      'Snow': 'snow.jpg',
      'Sunny': 'sunny.jpg',
      'Thunderstorm': 'thunderstorm.jpg',
      'Drizzle': 'drizzle.jpg',
      'Mist': 'mist.jpg'
    };
    document.body.style.backgroundImage = `url(img/${bgImages[status] || 'bg.jpg'})`;
  }
  
  function getIconClass(weather) {
    const icons = {
      'Rain': 'fas fa-cloud-showers-heavy',
      'Clouds': 'fas fa-cloud',
      'Clear': 'fas fa-cloud-sun',
      'Snow': 'fas fa-snowman',
      'Sunny': 'fas fa-sun',
      'Mist': 'fas fa-smog',
      'Thunderstorm': 'fas fa-thunderstorm',
      'Drizzle': 'fas fa-cloud-rain'
    };
    return icons[weather] || 'fas fa-cloud-sun';
  }
  
  function reset() {
    document.getElementById('input-box').value = "";
  }
  
  function addZero(num) {
    return num < 10 ? "0" + num : num;
  }
  