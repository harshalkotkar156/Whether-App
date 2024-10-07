

const userTab = document.querySelector("[data-user]");

const searchTab = document.querySelector("[data-search]");

const userContainer = document.querySelector(".weather-container");

const grantAccessContainer = document.querySelector(".grant-location-container");
const  searchForm = document.querySelector("[data-searchForm");

const loadingScreen = document.querySelector(".loading-container");

const userInfoContainer = document.querySelector(".user-weather");



let currentTab = userTab;
const API_KEY = "a08ecc54b4c5e467be769ab07527eec8";

currentTab.classList.add("current-tab");

getfromSessionStorage();



function switchTab(clickedTab){
    if(clickedTab != currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            searchForm.classList.remove("active");
            
            userInfoContainer.classList.remove("active");

            getfromSessionStorage();
              
        }
    }
}



userTab.addEventListener("click",()=>{
    switchTab(userTab);
})


searchTab.addEventListener("click",()=>{
    switchTab(searchTab);

})



function  getfromSessionStorage(){
    const localCoordinates =sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");

    }else{

        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}


async function fetchUserWeatherInfo(coordinates)
{

    const {lat, lon} = coordinates;

    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        // if (!response.ok) {
        //     throw new Error(`HTTP error! Status: ${response.status}`);
        // }
        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err){
        loadingScreen.classList.remove("active");
    }

}






function renderWeatherInfo(weatherInfo)
{

    const cityName =document.querySelector("[data-cityName]");

    const countryIcon = document.querySelector("[data-countryIcon]");

    const desc = document.querySelector('[data-weatherDesc]');

    const weatherIcon = document.querySelector('[data-weatherIcon]');

    const temp = document.querySelector("[data-temp]");
    const windSpeed = document.querySelector("[wind-speed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloud]");

    console.log("this is info : ",weatherInfo);


    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;

    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.textContent=`${weatherInfo?.main?.temp} °C`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed}m/s`;


    humidity.innerText = `${weatherInfo?.main?.humidity}%`;

    cloudiness.innerText=`${weatherInfo?.clouds?.all}%`;
    

    





}

function getLocation(){
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);

    }else{

    }
}


function showPosition(position)
{
    const userCoordinates ={
        lat:position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);


}
const grantAccessButton=document.querySelector('[data-grantAccess]');

grantAccessButton.addEventListener("click",getLocation);

let searchInput=document.querySelector('[data-searchInput]');


searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName===""){
        return;
    }else{
        fetchSearchWeatherInfo(cityName);
    }
})

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessButton.classList.remove("active");

    try{
        // if(city==null){
        //     city='nashik';
        // }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        loadingScreen.classList.remove('active');
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);

    }
    catch(err)
    {
        console.log("Bhai error : ", err)
    }

}































// // const API_KEY = "6330d88cf1cc7d67549d809a09c4599b";




// async function showWeather() {
//     // try{
//     //     let lat = 44.34;
//     //     let lon = 10.99;
//     //       // Replace with your valid API key
//         let cityname ='pune';
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);

//     //     // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

//     //     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
//     //     const data = await response.json();

//     //     document.querySelector("#city").textContent=data.name;
//     //     document.querySelector("#condition").textContent=data.weather[0].main;
//     //     console.log("Api Data:", data);
//     //     console.log(data.main.temp);

//     // }
//     // catch(err){
//     //     console.log("Error hain bhai");
//     // }
//     try {
//         let lat = 18.34;
//         let lon = 73.99;
//         // let cityname="pune";
//         // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);
//         let cityname ='pune';
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_KEY}&units=metric`);

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
        
//         console.log(data.name);
//         console.log("Temperature:", data.main.temp);
     
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//     }
    



// }
// showWeather();

