// Fetch a random nature photo from Unsplash API
fetch ("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then (res => res.json()) // Parse the response to JSON
    .then (data => {
    // Sets the background image of the body to the fetched photo
    document.body.style.backgroundImage = `url(${data.urls.regular})` 
    // Display the author's name
    document.getElementById("author").textContent = `By: ${data.user.name}` 
}) 
.catch (err => {
    // If there is an error, set a default background image
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    document.getElementById("author").textContent = `By: Dodi Achmad`
});

/**
 * Challenge: Update the code below and in the 
 * getCurrentLocation callback to use try...catch
 */

// Fetches the Dogecoin data from CoinGecko API
fetch ("https://api.coingecko.com/api/v3/coins/dogecoin")
.then (res => {
    if (!res.ok) {
        throw Error("Something went wrong") // Throw an error if response is not ok
    } 
    return res.json(); // Parse the response to JSON
})
    .then (data => {
     // Updates the HTML to display cryptocurrency information
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    document.getElementById("crypto").innerHTML += `
        <p>🎯: $${data.market_data.current_price.usd}</p>
        <p>👆: $${data.market_data.high_24h.usd}</p>
        <p>👇: $${data.market_data.low_24h.usd}</p>
    `
}) 
.catch (err => console.error(err)) // Log any errors to the console

// Function to get the current time and display it
function getCurrentTime() {
    const date = new Date() // Get the current date
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" }) // Format and display the time
}

// Update the time every second
setInterval(getCurrentTime, 1000)

// Get the user's current geographical location
navigator.geolocation.getCurrentPosition(async position => {

    try {
        // Fetch weather data based on user's location
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`);
        if (!res.ok) {
            throw Error("Weather data not available"); // Throw an error if response is not ok
        }
        const data = await res.json(); // Parse the response to JSON
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; //  Weather icon URL
        // Update the weather element with weather data
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p>
            <p class="weather-city">${data.name}</p>
        `;
    } catch (err) {
        console.error(err); // Log any errors to the console
    }
});