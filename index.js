document.addEventListener("DOMContentLoaded", () => {
  // Get references to important elements in the page
  const searchButton = document.querySelector(".searchButton");
  const searchInput = document.querySelector(".searchInput");
  const cityName = document.querySelector(".city-name");
  const temperature = document.querySelector(".temperature");
  const windspeed = document.querySelector(".windspeed");
  const humidity = document.querySelector(".humidity-one");
  const soilTemp = document.querySelector(".soil-temp");
  const rainElement = document.querySelector(".rain-value");
   // Create a button that allows user to refresh and search again
  const refreshButton = document.createElement("button");
  refreshButton.textContent = "Click here to search another city";
  refreshButton.classList.add("resetButton");
  refreshButton.style.display = "none"; // Hide it at first
  document.body.appendChild(refreshButton);