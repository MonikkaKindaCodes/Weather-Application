let loc = document.getElementById('location-timezone');
let temp = document.getElementById('temperature-degree');
let desc = document.getElementById('temperature-description');
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
                        const {name, country} = data;
                        const {feels_like} = data.main;
                        const {id, main} = data.weather[0];
                        loc.textContent = name;
                        temp.textContent = feels_like;
                        desc.textContent = main;

                        console.log(data);  
                    })
        });
    }
});