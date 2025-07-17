// Wait until the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Your API key from OpenWeatherMap
  const apiKey = "8ed75f33e8c79dc7ae27a36fff59b1b8";

  // Select the input and button from the page
  const inputField = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeather");

  // Click event to get weather when the button is clicked
  getWeatherBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Stop page from reloading

    const city = inputField.value.trim(); // Get city from input field

    if (city === "") {
      alert("Please enter a city name.");
      return;
    }

    // Build the full URL with the city name and API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch the weather data
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json(); // Convert the response to JSON
      })
      .then(data => {
        console.log(data)
        // Update the main temperature and city display
        document.querySelector(".temp").textContent = `${data.main.temp}°C`;
        document.querySelector(".city").textContent = data.name;

        // Update humidity and wind speed
        document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
        document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;

        // Optional: show temperature at the bottom
        const resultDiv = document.getElementById("weatherResult");
        resultDiv.textContent = `Temperature in ${city}: ${data.main.temp}°C`;

        // BONUS: loop through weather array to log conditions
        data.weather.forEach(condition => {
          console.log("Condition:", condition.main);
        });
      })
      .catch(error => {
        // If something goes wrong, show error message
        document.getElementById("weatherResult").textContent = "Could not fetch weather data.";
        console.error(error);
      });
  });

  // Extra Event 1: input typing event
  inputField.addEventListener("input", () => {
    console.log("Typing city name:", inputField.value);
  });

  // Extra Event 2: hover over weather section
  document.querySelector(".weather").addEventListener("mouseover", () => {
    console.log("You hovered over the weather card");
  });
});
