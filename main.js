let loc = document.getElementById('location-timezone');
let temp = document.getElementById('temperature-degree');
let desc = document.getElementById('temperature-description');
let tempIcon = document.getElementById('icon');
let clock = document.getElementById('time');
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
                        temp.textContent = Math.round((((feels_like - 273.15) * 9) / 5) + 32);
                        desc.textContent = main;
                        if(id < 250) {
                            tempIcon.src = 'thunderstorms.svg'
                        } else if (id < 350) {
                            tempIcon.src = 'drizzle.svg'
                        } else if (id < 600) {
                            tempIcon.src = 'rain.svg'
                        } else if (id < 700) {
                            tempIcon.src = 'snow.svg'
                        } else if(id > 700 && id < 800) {
                            tempIcon.src = 'snow.svg'
                        } else if(id === 800) {
                            tempIcon.src = 'clear-day.svg'
                        } else if(id > 800 && id < 803) {
                            tempIcon.src = 'partly-cloudy-day.svg'
                        } else {
                            tempIcon.src = 'cloudy.svg'
                        }
                        console.log(data);  
                    });
        });
    }
  
});

//Showing Time
function showTime() {
    let today = new Date(), 
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();

    //Set AM / PM
    const amPm = hour >= 12 ? 'PM' : 'AM';

    //12hr Format
    hour = hour % 12 || 12;

    //Output Time
    time.innerHTML = `${hour}<span>:</span>${addZero(minutes)}<span>:</span>${addZero(seconds)} ${amPm}`;

    setTimeout(showTime, 1000);
}

//Adding 0 function

function addZero(n) {
   return(parseInt(n, 10) < 10 ? '0' : '') + n; 
}

//Run
showTime();
