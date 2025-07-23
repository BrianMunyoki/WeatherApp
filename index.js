document.addEventListener("DOMContentLoaded", () => { // This is the first event listener that allows the DOM to run

  const apiKey = "8ed75f33e8c79dc7ae27a36fff59b1b8"; // This is the API that allows me to access the weather app

  const searchButton = document.querySelector(".searchButton"); // Here I have selected the HTML element then declared a variable
  const searchInput = document.querySelector(".searchInput"); // Here I have selected the HTML element (class searchInput) then declared a variable

  const refreshButton = document.createElement("button"); // Here I have created a new button element
  refreshButton.textContent = "Click here to search another city"; // This is the button name to refresh
  refreshButton.classList.add("resetButton"); // I have now styled the new element
  refreshButton.style.display = "none"; // Hide the button initially
  document.body.appendChild(refreshButton); // Here I have appended the element button created to the body

  refreshButton.addEventListener("click", () => { // This is the event listener to the refresh button
    location.reload(); // Tells the browser to reload the current page just like if the user hit the refresh button
  });

  searchButton.addEventListener("click", (event) => { // This is the event listener to the search button
    event.preventDefault(); // This prevents the page from reloading

    const city = searchInput.value.trim(); // This removes unnecessary spaces in the user's input

    if (city === "") { // If a user clicks to check weather when the search is empty, show an alert
      alert("Please enter a city name.");
      return;
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,rain,soil_temperature_0cm`; // This is the API URL and we have declared a variable to store it

    fetch(url) // Here we fetch the URL for the API
      .then(response => { // Here we are creating a function on what to do after we get the data
        if(!response.ok) {
          return response.json(); // Convert the response to JSON
        } else {
          alert("Invalid city name");
          throw new Error("Failed to fetch data");
        }
      })
fetch("https://your-api-url.com")
  .then(response => response.json())
  .then(data => {
    data.forEach(city => {
      console.log("Temp:", city.temp);
      console.log("Humidity:", city.humidity);
      console.log("Rain:", city.rain);
      console.log("Wind speed:", city.windSpeed);
      console.log(`Soil Temp: ${city.soilTemperature}`);
    });
  })
  .catch(error => {
    console.error("Error:", error);
  });