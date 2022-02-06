var textEl = document.querySelector(".text");
var tableEl = document.querySelector(".history");
var detailsEl = document.querySelector(".details");
var forecastEl = document.getElementById("forecast");
var specifics = document.querySelector(".specifics");
var searchEl = document.getElementById("search");
var uv = document.getElementById("uvIndex");
var iconEl = document.getElementById('icon')
var current = {};
var data;
var cities = [];
var fiveDay = [];
var lat;
var lon;
var weather;

//post today's date and dates of 5 day forecast
function todayDate(){
    var date = document.getElementById("date");
    date.textContent = moment().format("MM/DD/YY");
    var day = document.getElementById("dayOne");
    day.textContent = moment().format("MM/DD/YY");
    var day = document.getElementById("dayTwo");
    day.textContent = moment().add(1,"d").format("MM/DD/YY");
    var day = document.getElementById("dayThree");
    day.textContent = moment().add(2,"d").format("MM/DD/YY");
    var day = document.getElementById("dayFour");
    day.textContent = moment().add(3,"d").format("MM/DD/YY");
    var day = document.getElementById("dayFive");
    day.textContent = moment().add(4,"d").format("MM/DD/YY");

}

//fill in history of cities searched from local storage
renderMessage();
//post today's date
todayDate();

// response and api pull after clicking search button
searchEl.addEventListener("click", function(){
        var tr = document.createElement("tr");
        tr.innerHTML = textEl.value;
        document.getElementById("history").appendChild(tr);
        tr.setAttribute("class", "tr");
        document.querySelector('.city').innerHTML = textEl.value;
        
        // store history of cities searched
        cities.push(textEl.value);
        localStorage.setItem('cityHistory', JSON.stringify(cities));

        //fetch latitude and longitude of city searched
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + textEl.value + '&appid=c6d09d6dcb25d5e4435aa32b308559b9')
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                console.log(data);
                lat =  (data.coord.lat);
                lon = (data.coord.lon);
            }) 

            //using latitude and longitude fetched, gather data for city searched
            .then(function(){
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=c6d09d6dcb25d5e4435aa32b308559b9`)
                            
                            .then(function(response){
                                return response.json();
                            })
                            .then(function(data){
                                console.log(data)
                                fiveDay = data.daily;
                                current = data.current;
                                //post an icon for today's weather report   
                                weather = current.weather[0].icon;
                                var iconUrl =  `http://openweathermap.org/img/w/${weather}.png`;
                                iconEl.setAttribute("src",iconUrl);
                                
                
                                //fill in today's data for city searched
                                document.getElementById('temp').innerHTML = `${data.current.temp} Degrees`;
                                document.getElementById('humidity').innerHTML = `${data.current.humidity}%`;
                                document.getElementById('windSpeed').innerHTML = `${data.current.wind_speed} mph`;
                                document.getElementById('uvIndex').innerHTML = `${Math.round(data.current.uvi)}`;
                                
                                // icon();
                                    //uv index warning colors
                                        if(uv.textContent>=0 && uv.textContent<4){
                                            uv.setAttribute("style", "background-color:rgb(7, 179, 21);");
                                        }else if (uv.textContent >= 4 && uv.textContent < 8){
                                            uv.setAttribute("style", "background-color:yellow;");
                                        }else if (uv.textContent >= 8){
                                            uv.setAttribute("style", "background-color:red;");
                                        }
                                 //fill in data for 5 day forecast of city searched       
                                document.getElementById('oneTemp').innerHTML = `${data.current.temp} Degrees`;
                                document.getElementById('oneHum').innerHTML = `${data.current.humidity}%`;
                                document.getElementById('oneWind').innerHTML = `${data.current.wind_speed}%`;
                                var dayWeather = data.current.weather[0].icon
                                var dayIconUrl = `http://openweathermap.org/img/w/${dayWeather}.png`
                                var dayIconUrlEl = document.querySelector(".dayOneIcon");
                                dayIconUrlEl.setAttribute("src", dayIconUrl) ;

                                document.getElementById('twoTemp').innerHTML = `${fiveDay[1].temp.max} Degrees`;
                                document.getElementById('twoHum').innerHTML = `${fiveDay[1].humidity}%`;
                                document.getElementById('twoWind').innerHTML = `${fiveDay[1].wind_speed}%`;
                                dayWeather = `${fiveDay[1].weather[0].icon}`
                                dayIconUrl = `http://openweathermap.org/img/w/${dayWeather}.png`
                                dayIconUrlEl = document.querySelector(".dayTwoIcon");
                                dayIconUrlEl.setAttribute("src", dayIconUrl) ;

                                document.getElementById('threeTemp').innerHTML = `${fiveDay[2].temp.max} Degrees`;
                                document.getElementById('threeHum').innerHTML = `${fiveDay[2].humidity}%`;
                                document.getElementById('threeWind').innerHTML = `${fiveDay[2].wind_speed}%`;
                                dayWeather = `${fiveDay[2].weather[0].icon}`
                                dayIconUrl = `http://openweathermap.org/img/w/${dayWeather}.png`
                                dayIconUrlEl = document.querySelector(".dayThreeIcon");
                                dayIconUrlEl.setAttribute("src", dayIconUrl) ;

                                document.getElementById('fourTemp').innerHTML = `${fiveDay[3].temp.max} Degrees`;
                                document.getElementById('fourHum').innerHTML = `${fiveDay[3].humidity}%`;
                                document.getElementById('fourWind').innerHTML = `${fiveDay[3].wind_speed}%`;
                                dayWeather = `${fiveDay[1].weather[0].icon}`
                                dayIconUrl = `http://openweathermap.org/img/w/${dayWeather}.png`
                                dayIconUrlEl = document.querySelector(".dayFourIcon");
                                dayIconUrlEl.setAttribute("src", dayIconUrl);

                                document.getElementById('fiveTemp').innerHTML = `${fiveDay[4].temp.max} Degrees`;
                                document.getElementById('fiveHum').innerHTML = `${fiveDay[4].humidity}%`;  
                                document.getElementById('fiveWind').innerHTML = `${fiveDay[4].wind_speed}%`;
                                dayWeather = `${fiveDay[1].weather[0].icon}`
                                dayIconUrl = `http://openweathermap.org/img/w/${dayWeather}.png`
                                dayIconUrlEl = document.querySelector(".dayFiveIcon");
                                dayIconUrlEl.setAttribute("src", dayIconUrl); 
                                
                            })
                        //clear the search bar    
                        textEl.value ='';

            })
        
  });   
 

function renderMessage(){
    // document.getElementById('date').textContent = moment().format(MM/DD/YY);
    var history = JSON.parse(localStorage.getItem("cityHistory"));
    if(history !== null){
        for(i = 0; i<history.length; i++){
            var tr = document.createElement("tr");
            tr.innerHTML = history[i];
            document.getElementById("history").appendChild(tr);
            tr.setAttribute("class", "tr");
        }
    }
}