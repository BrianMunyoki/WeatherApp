document.addEventListener("DOMContentLoaded",()=>{//this this is the first even listener that aloows the dom to run
  const apiKey="8ed75f33e8c79dc7ae27a36fff59b1b8";//this is the api that allows me to access the weather app
  const searchButton=document.querySelector(".searchButton");//Here I  have selected the html element then declared a variable
  const searchInput=document.querySelector(".searchInput");//Here I have selected the html element the class search input then declared a variable
  const refreshButton=document.createElement("button");//Here I have selected the htmlm element under the class button

  refreshButton.textContent="Click here to search another city";//This is the button name to refressh
  refreshButton.classList.add("resetButton");//I have now styled the new element
  document.body.appendChild(refreshButton);//Here I have appended the element button created to the body 
  refreshButton.addEventListener("click",(event)=>{//This is the event listener to the refreshButton
    location.reload()//Tells the browser to reload the current page just like if the user hit the refressh button
  })
  searchButton.addEventListener("click",(event)=>{//This is the event listener to the search button
    event.preventDefault()//This prevents the page from reloading
    const city=searchInput.value.trim()///This removes unncessary spaces in the users input
    if(city===""){//If a user clicks to check weather updated when the search is empty, the user gets an alert to input a city
      alert("please enter a city name.");
      return;
    }
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;//This is the url to the api and we have declared a variable on the url
    fetch(url)///Here we have fetch the url for the api and I have used the decleard variable "url"
    .then(response=>{//Here we are creating a function on what to do after we get the data from the api
      if(response.ok){
        console.log("success")
        return response.json();//Here we are requesting the data in json file since js understand the data in json. we have converted the data from the api in json
      }else{// Here is the response is not okay,i.e if the user inputs a wrong data not in  our data, we have created an alert to tell the user an invalid city
        console.log("Not successful")
        alert("invalid City Name")
        throw new Error("failed to fetch data")
      }
    })
    .then(data=>{//Here is where we have maniplated our data from the api based on the users request
      console.log(data)
      document.querySelector(".temperature").textContent=`${data.main.temp}°C`;//Temperature
      document.querySelector(".city-name").textContent=data.name;//city name
      document.querySelector(".humidity-one").textContent=`Humidity: ${data.main.humidity}%`;//humidity
      document.querySelector(".windspeed").textContent=`Wind:${data.wind.speed} km/h`;//wind speed
      const iconCode=data.weather[0].icon;
      refreshButton.style.display = "block";//Here we are telling js show this button after the code is successful to enable the user to be able to refresh the page. Note: This will only apply if the request was successful
    })
    .catch(error=>{
      console.error("Error:", error);//log errors that may occur during the catching process
    })

  })
})