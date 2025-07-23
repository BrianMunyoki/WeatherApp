document.addEventListener("DOMContentLoaded", () => {// Get references to important elements in the page
  
  const searchButton = document.querySelector(".searchButton");
  const searchInput = document.querySelector(".searchInput");
  const cityName = document.querySelector(".city-name");
  const temperature = document.querySelector(".temperature");
  const windspeed = document.querySelector(".windspeed");
  const humidity = document.querySelector(".humidity-one");
  const soilTemp = document.querySelector(".soil-temp");
  const rainElement = document.querySelector(".rain-value");
   
  const refreshButton = document.createElement("button");// Create a button that allows user to refresh and search again
  refreshButton.textContent = "Click here to search another city";
  refreshButton.classList.add("resetButton");
  refreshButton.style.display = "none"; // Hide it at first
  document.body.appendChild(refreshButton);
    
  refreshButton.addEventListener("click", () => {// Reload page when refresh button is clicked
    location.reload();
  });
  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form from reloading the page

    const city = searchInput.value.trim(); // Get city input from user
    if (city === "") {
      alert("Please enter a city name.");
      return;
    }
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`) // Using the Open-Meteo geocoding API to find latitude and longitude
      .then(response => {
        if (!response.ok) throw new Error("Geocoding failed.");
        return response.json();
      })
      .then(data => {
        if (!data.results || data.results.length === 0) {
          alert("City not found.");
          return;
        }
        const latitude=data.results[0].latitude;// Building the weather forecast API URL
        const longitude = data.results[0].longitude;
        const url=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,soil_temperature_0cm`;
        fetch(url)
          .then(res => res.json())
          .then(weatherData => {
            const hourly = weatherData.hourly;

            // Get the current hour (in ISO format like "2025-07-23T14")
            const now = new Date();
            const currentHourISO = now.toISOString().slice(0, 13);
            const timeIndex = hourly.time.findIndex(t => t.startsWith(currentHourISO));

            if (timeIndex === -1) {
              alert("Could not match current hour in forecast.");
              return;
            }
            cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1);

            // Update UI values
            temperature.textContent = `${hourly.temperature_2m[timeIndex]}°C`;
            humidity.textContent = `${hourly.relative_humidity_2m[timeIndex]}%`;
            windspeed.textContent = `${hourly.wind_speed_10m[timeIndex]} km/h`;
            let rainValue = 0;//check up to 6 hours ahead for rain
            for (let i = timeIndex; i < timeIndex + 6 && i < hourly.rain.length; i++) {
              if (hourly.rain[i] > 0) {
                rainValue = hourly.rain[i];
                break;
              }
            }
            if (rainValue > 0) { // Show rain result clearly
              rainElement.textContent = `${rainValue} mm expected`;
            } else {
              rainElement.textContent = "No rain expected";
            }
            if (soilTemp) {// Soil temperature update
              soilTemp.textContent = `${hourly.soil_temperature_0cm[timeIndex]}°C`;
            }
            refreshButton.style.display = "block";
          })
          .catch(error => {
            console.error("Weather fetch error:", error);
            alert("Could not load weather data.");
          });
      })
      .catch(error => {
        console.error("City fetch error:", error);
        alert("City lookup failed.");
      });
  });
});
