var textEl = document.querySelector(".text");
var tableEl = document.querySelector(".history");
var detailsEl = document.querySelector(".details");
var forecastEl = document.getElementById("forecast");
var specifics = document.querySelector(".specifics");
var searchEl = document.getElementById("search");
var cities = [];
var lat;
var lon;

renderMessage();

searchEl.addEventListener("click", function(){
        var tr = document.createElement("tr");
        tr.innerHTML = textEl.value;
        document.getElementById("history").appendChild(tr);
        tr.setAttribute("class", "tr");
        document.querySelector('.city').innerHTML = textEl.value;
        
        cities.push(textEl.value);
        localStorage.setItem('cityHistory', JSON.stringify(cities));

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + textEl.value + '&appid=c6d09d6dcb25d5e4435aa32b308559b9')
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                lat =  (data.coord.lat);
                lon = (data.coord.lon);
            }) 
            .then(function(){
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=c6d09d6dcb25d5e4435aa32b308559b9`)
                            
                            .then(function(response){
                                return response.json();
                            })
                            .then(function(data){
                                console.log(data);
                                document.getElementById('temp').innerHTML = `${data.current.temp} Degrees`;
                                document.getElementById('humidity').innerHTML = `${data.current.humidity}`;
                                document.getElementById('windSpeed').innerHTML = `${data.current.wind_speed} mph`;
                                document.getElementById('uvIndex').innerHTML = `${data.current.uvi}`;
                                // console.log(data.current.temp);
                                // console.log(data.current.humidity);
                                // console.log(data.current.wind_speed);
                                // console.log(data.current.uvi);

                                document.getElementById('oneTemp').innerHTML = `${data.current.temp} Degrees`;
                                document.getElementById('oneHum').innerHTML = `${data.current.humidity}`;

                                document.getElementById('twoTemp').innerHTML = `${data.daily.Array[1].temp} Degrees`;
                                document.getElementById('twoHum').innerHTML = `${data.daily.Array[1].humidity}`;
                                document.getElementById('threeTemp').innerHTML = `${data.daily.Array[2].temp} Degrees`;
                                document.getElementById('threeHum').innerHTML = `${data.daily.Array[2].humidity}`;
                                document.getElementById('fourTemp').innerHTML = `${data.daily.Array[3].temp} Degrees`;
                                document.getElementById('fourHum').innerHTML = `${data.daily.Array[3].humidity}`;
                                document.getElementById('fiveTemp').innerHTML = `${data.daily.Array[4].temp} Degrees`;
                                document.getElementById('fiveHum').innerHTML = `${data.daily.Array[4].humidity}`;
                            })

                        textEl.value ='';

            })
        
  });      


function renderMessage(){
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