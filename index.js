document.addEventListener("DOMContentLoaded",()=>{
  const apiKey="8ed75f33e8c79dc7ae27a36fff59b1b8";
  const searchButton=document.querySelector(".searchButton")
  const searchInput=document.querySelector(".searchInput")
  const refreshButton=document.createElement("button")
  searchButton.addEventListener("click",(event)=>{
    event.preventDefault()
    const city=searchInput.value.trim()
    if(city===""){
      alert("please enter a city name.");
      return;
    }
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
    .then(response=>{
      if(response.ok){
        console.log("success")
        return response.json();
      }else{
        console.log("Not successful")
        alert("invalid City Name")
        throw new Error("failed to fetch data")
      }
    })
    .then(data=>{
      console.log(data)
      document.querySelector(".temperature").textContent=`${data.main.temp}°C`;
      document.querySelector(".city-name").textContent=data.name;
      document.querySelector(".humidity-one").textContent=`Humidity: ${data.main.humidity}%`;
      document.querySelector(".windspeed").textContent=`Wind:${data.wind.speed} km/h`;
      const iconCode=data.weather[0].icon;
    })
    .catch(error=>{
      console.error("Error:", error);
    })

  })
})