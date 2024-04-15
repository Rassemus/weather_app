
document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
});

window.addEventListener('load', () => {
    const geolocationError = document.getElementById('geolocation-error');
    const kelvinToCelsius = kelvin => kelvin - 273.15;
    

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const locationElement = document.getElementById('location');
            locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;

            const apiKey = "API_KEY";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const celsiusTemperature = kelvinToCelsius(data.main.temp);

                const weatherElement = document.getElementById('weather');
                weatherElement.textContent = `Weather: ${data.weather[0].main}, Temperature: ${celsiusTemperature.toFixed(1)}°C`;
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }, error => {
            if (error.code === error.PERMISSION_DENIED) {
                console.error('The location service is blocked');
                geolocationError.textContent = 'The location service is blocked. Allow the use of the location service from the browser settings.';
                geolocationError.style.display = 'block';
            } else {
                console.error('Error for location service:', error.message);
                geolocationError.textContent = 'Error for location service: ' + error.message;
                geolocationError.style.display = 'block';
            }
        });
    } else {
        console.error('Geolocation is not supported.');

    }
});
