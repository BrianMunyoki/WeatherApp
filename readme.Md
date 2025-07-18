# 🌦️ Brian's Weather App

A simple weather app built with HTML, CSS, and JavaScript. It fetches current weather data for any city using the [OpenWeatherMap API](https://openweathermap.org/api).

## Features

- Search weather by city name
- Displays:
  - Temperature in °C
  - City name
  - Humidity
  - Wind speed
- Error handling for invalid city names
- Refresh button to search another city

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6)
- OpenWeatherMap API

## Getting Started

1. **Clone the repo:**
   ```bash
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
### 2. Open the project in your browser

Just open the `index.html` file directly in your browser.

### 3. Enter a city name

Type the name of any city into the input field and click the **"Check Weather"** button to see the current weather details.

### 4. API Key

This app uses a free API key from OpenWeatherMap.

Replace the placeholder API key in your `index.js` file with your own key if needed:

```js
const apiKey = "your_api_key_here";

### Project structure
weather-app/
│
├── index.html        # Main HTML structure
├── styles.css        # Custom styling
├── index.js          # JavaScript functionality
└── images/           # Folder for icons (e.g., weather icons)
## To Do
 Add weather icons dynamically based on API data

 Improve mobile responsiveness

 Include more detailed weather info (e.g., pressure, sunrise)