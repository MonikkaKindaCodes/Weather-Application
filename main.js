let loc = document.getElementById('location-timezone');
let temp = document.getElementById('temperature-degree');
let desc = document.getElementById('temperature-description');
let tempIcon = document.getElementById('icon');
window.addEventListener('load', ()=> {
    let long;
    let lat;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            let proxy = 'https://cors-anywhere.herokuapp.com/';
            const api =`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=05b957a33f2a1a6109662b4e76cf1284`;
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                    .then(data => {
                        const {name} = data;
                        const {feels_like} = data.main;
                        const {id, main} = data.weather[0];
                        loc.textContent = name;
                        temp.textContent = feels_like;
                        desc.textContent = main;
                        if(id < 250) {
                            tempIcon.src = 'thunderstorms.svg';
                        } else if (id < 350) {
                            tempIcon.src = 'drizzle.svg';
                        } else if (id < 600) {
                            tempIcon.src = 'rain.svg';
                        } else if (id < 700) {
                            tempIcon.src = 'snow.svg';
                        } else if(id > 700 && id < 800) {
                            tempIcon.src = 'snow.svg';
                        } else if(id === 800) {
                            tempIcon.src = 'clear-day.svg';
                        } else if(id > 800 && id < 803) {
                            tempIcon.src = 'partly-cloudy-day.svg';
                        } else {
                            tempIcon.src = 'cloudy.svg';
                        }
                        console.log(data);  
                    });
        });
    }
  
});