var textEl = document.querySelector(".text");
var tableEl = document.querySelector(".history");
var detailsEl = document.querySelector(".details");
var forecastEl = document.getElementById("forecast");
var specifics = document.querySelector(".specifics");
var searchEl = document.getElementById("search");
var cities = [];
var fiveDay = [];
// var today = moment();
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
                                document.getElementById('humidity').innerHTML = `${data.current.humidity}%`;
                                document.getElementById('windSpeed').innerHTML = `${data.current.wind_speed} mph`;
                                document.getElementById('uvIndex').innerHTML = `${data.current.uvi}`;
                                document.getElementById('oneTemp').innerHTML = `${data.current.temp} Degrees`;
                                document.getElementById('oneHum').innerHTML = `${data.current.humidity}%`;
                                if(data.current.weather.main==="cloudy"){
                                    document.getElementById('icon')
                                    document.createElement("i");
                                    // document.getElementById("icon").appendChild(i);
                                    i.setAttributeNode("class", "fas fa-cloud");
                                }else if(data.current.weather.main==="rain"){
                                    document.getElementById('icon')
                                    document.createElement("i");
                                    // document.getElementById("icon").appendChild(i);
                                    i.setAttributeNode("class", "fas fa-cloud-rain");
                                }else{
                                    document.getElementById('icon')
                                    document.createElement("i");
                                    // document.getElementById("icon").appendChild(i);
                                    i.setAttributeNode("class", "fas fa-sun");
                                }
                                fiveDay = data.daily;
                                console.log(fiveDay);
                                
                                

                                // document.getElementById('twoTemp').innerHTML = `${fiveDay[1].daily.temp.max} Degrees`;
                                // document.getElementById('twoHum').innerHTML = `${fiveDay[1].daily.humidity}%`;
                                // document.getElementById('threeTemp').innerHTML = `${fiveDay[2].daily.temp.max} Degrees`;
                                // document.getElementById('threeHum').innerHTML = `${fiveDay[2].daily.humidity}%`;
                                // document.getElementById('fourTemp').innerHTML = `${fiveDay[3].daily.temp.max} Degrees`;
                                // document.getElementById('fourHum').innerHTML = `${fiveDay[3].daily.humidity}%`;
                                // document.getElementById('fiveTemp').innerHTML = `${fiveDay[4].daily.temp.max} Degrees`;
                                // document.getElementById('fiveHum').innerHTML = `${fiveDay[1].daily.humidity}%`;
                            })

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