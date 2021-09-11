const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');

const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');


const apiLink= 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey= '&appid=51fc442eb2061c1ef5fd9941a8a26365';
const units = '&units=metric'; //metric

let city; //= 'Warszawa';
let url;

//link & kluczAPI &jednostki




const getWeather = () => {
    city = (!input.value)?'Warszawa' : input.value;
    url = apiLink + city + apiKey + units;

    axios.get(url)
    .then(res => {
        console.log(res);
        const temp = res.data.main.temp;
        const hum = res.data.main.humidity;
        console.log(res.data.weather);  //[{tutaj},123, true ]
        const status = Object.assign({},...res.data.weather) //spread na tablicy
        console.log(status);
        weather.textContent = status.main;
        cityName.textContent = res.data.name;
        temperature.textContent = temp + '°';
        humidity.textContent = hum + '%';
        warning.textContent = '';
        input.value = '';

        if(status.id >=200 && status.id <300){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/11d@2x.png') //Thunderstorm 200+
        }else if(status.id >=300 && status.id <400){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/09d@2x.png') //Drizzle 300+
        }else if(status.id >=500 && status.id <600){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/10d@2x.png') //Rain 500+
        }else if(status.id >=600 && status.id <700){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/13d@2x.png') //Snow 600+
        }else if(status.id >=700 && status.id <800){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/50d@2x.png') //Atmosphere 700+
        }else if(status.id ==800){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/01d@2x.png') //Clear 800
        }else if(status.id >=801){
            photo.setAttribute('src', 'http://openweathermap.org/img/wn/03d@2x.png') //Clouds 801+
        }else{
            photo.setAttribute('src', 'img/sun.jpg')                                //Praise the sun
        }
    })
    .catch(() => warning.textContent = 'Wpisz poprawná nazwé miasta')
}

const enterCheck = () => {
    if(event.keyCode === 13 ){
        getWeather();
    }
}

input.addEventListener('keyup', enterCheck)


getWeather()
btn.addEventListener('click', getWeather)

