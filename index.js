document.addEventListener("DOMContentLoaded", () => { // This is the first event listener that allows the DOM to run
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
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then(response=>{
      
      if(response.ok){
        console.log(response)
        return response.json();
        
      }else{
        alert("something went wrong")
        throw new Error("Bad Status")
      }
    })
    .then(data=>{
      if(!data.results || data.results.length===0){
        alert("city not found!")
        throw new Error("no results found")
      }
    const latitude=data.results[0].latitude;
    const longitude=data.results0[0].longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=wind_speed_10m,relative_humidity_2m,rain,soil_temperature_0cm`;

    console.log(response)
    })
    .catch(error => { 
      console.error("Something went wrong:", error);
      alert("Something went wrong. Please try again.");
  })
})
})
