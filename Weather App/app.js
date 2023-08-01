let result = document.querySelector('.result');
let searchBtn = document.querySelector('.search-btn');
let cityRef = document.getElementById('city');

const getWeather = () => {
    let cityValue = cityRef.value;

    if (cityValue.length === 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`
    }
    else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=f283e7a1e3a828ab328d61c9fca05aad&units=metric`;

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                result.innerHTML = `       
                <h2>${data.name}</h2>
                <h4 class="weather">${data.weather[0].main}</h4>
                <h4 class="desc">${data.weather[0].description}</h4>
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="icon"/>
                <h1>${data.main.temp}</h1>
                <div class="temp-container">
                    <div>
                        <h4 class="title">min</h4>
                        <h4 class="temp">${data.main.temp_min}</h4>
                    </div>
                    <div>
                        <h4 class="title">max</h4>
                        <h4 class="temp">${data.main.temp_max}</h4>
                    </div>
                </div>` 
            })
            .catch(()=>{
                result.innerHTML =`<h3 class="msg">City Not Found</h3>`
            });
    }
};

searchBtn.addEventListener('click',getWeather);
window.addEventListener('load', getWeather);