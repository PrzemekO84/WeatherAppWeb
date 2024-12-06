const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementsByClassName("weatherInfo");
const errorMessage = document.getElementById("errorMessage");

function displayError(city){

    Array.from(weatherInfo).forEach(element => {
        element.style.display = "none";
    });

    errorMessage.style.display = "block"

    if(city === ""){
        errorMessage.textContent = "Please enter a city"
    }
    else{
        errorMessage.textContent = `We could not find city named: ${city}`
    }

}

async function fetchWeather(city){

    const apiKey = "fb43a0ce721d1ffc6f18d7eb1fccb2ec"
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(apiURL);

    if(response.ok === false){
        displayError(city);
    }
    else{

        const responseJson = await response.json()
    
        updateCard(responseJson);
    }

    
}

function updateCard(fetchedData){

    Array.from(weatherInfo).forEach(element => {
        element.style.display = "block";
    });

    errorMessage.style.display = "none";
    
    const city = document.getElementById("city");
    const time = document.getElementById("time");
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    const weather = document.getElementById("weather");
    const emoji = document.getElementById("emoji");
    const test = document.getElementById("test");
    
    
    city.textContent = `🏙️ City: ${fetchedData.name}`;
    time.textContent = `🕒 ` + getTime(fetchedData.timezone);
    temp.textContent = `🌡 ` + convertTemperature(fetchedData.main.temp);
    humidity.textContent = `💦 The humidity is: ${fetchedData.main.humidity}%`;
    weather.textContent = `The current weather is ${fetchedData.weather[0].description} ` + getWeatherEmoji(fetchedData.weather[0].id);
    emoji.textContent = "";
    test.textContent = "";

}

function getWeatherEmoji(emojiID){

    switch(true){
        case(emojiID >= 200 && emojiID < 300):
            return "⛈️"
        case(emojiID >= 300 && emojiID < 500):
            return "🌦️"
        case(emojiID >= 500 && emojiID < 600):
            return "🌧️"
        case(emojiID >= 600 && emojiID < 700):
            return "❄️ 🌨️"
        case(emojiID >= 700 && emojiID < 800):
            return "🌫️"
        case(emojiID > 800):
            return "☁️"
        case(emojiID === 800):
            return "☀️"
    }
}

function convertTemperature(temp){
    const celciusTemp = temp - 273.15

    return `The temperature is: ${Math.round(celciusTemp)} °C`
}

function getTime(timeZone){

    const date = new Date();

    const localTimeZone = (timeZone/3600);

    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const hour = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    const paddedHour = hour.toString().padStart(2, 0);
    const paddedMinutes = minutes.toString().padStart(2, 0);

    if(hour + localTimeZone > 24){

        const timeDifference = 24 - hour;
        const newTime = localTimeZone - timeDifference;
        const paddedNewTime = newTime.toString().padStart(2, 0);

        return `Current time: ${paddedNewTime}:${paddedMinutes})`

    }
    else if(hour + localTimeZone < 0){

        const timeDifference = hour - localTimeZone;
        const newTime = 24 - timeDifference;
        const paddedNewTime = newTime.toString().padStart(2, 0);

        return `Current time: ${paddedNewTime}:${paddedMinutes}`;
    }
    else{
        const newTime = hour + localTimeZone;
        const paddedNewTime = newTime.toString().padStart(2, 0);
        return `Current time: ${paddedNewTime}:${paddedMinutes}`;
    }

    
    
}

function darkMode(){

}

function lightMode(){

}

cityInput.addEventListener("keydown", async event =>{

    const city = document.getElementById("cityInput").value;
    
    if(event.key === "Enter"){
        if(city){
            try{

                await fetchWeather(city);

                
            }
            catch(error){

            }   
        }
        else{
            displayError(city);
        }
    }
})


//TODO 
// No to tak ogolnie trzeba popracowac nad tym error message display
//bo updateCard jest zawsze wywolywany przez co robia sie problemy w kodzie