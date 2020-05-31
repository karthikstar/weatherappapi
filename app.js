window.addEventListener('load',() =>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description')
  let temperatureDegree = document.querySelector('.temperature-degree')
  let locationTimezone = document.querySelector('.location-timezone')
  let temperatureSection = document.querySelector('.temperature')
  const temperatureSpan = document.querySelector('.temperature span')
// we are adding a event listener here that runs when we the browser loads.
//if navigator exists on the browser then we can find the exact location of user.

  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      // console.log(position)
      long = position.coords.longitude;

      lat = position.coords.latitude;
      // if get CORS error, use https://cors-anywhere.herokuapp.com/
      // const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=579a9c1142b2ca5e0ecd90081334f6eb`
      fetch(api)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        const {temp} = data.main;
        const {country} = data.sys;
        const {description,icon} = data.weather[0]

        // console.log(temp)
        //Set DOM elemenets from the api

        // converting temp in kelvin to celsius

        let celsius = (temp - 273.15)
        temperatureDegree.textContent = Math.floor(celsius)
        temperatureDescription.textContent = description
        locationTimezone.textContent = country
        // alternatve method using normal weather icons :
        // link = `http://openweathermap.org/img/wn/${icon}@2x.png`
        // document.querySelector(".weather-icon").setAttribute("src",link)
        // set icons
        setIcons(icon)
        // Formula For farenheight
        let faren = (temp - 273.15) * (9/5) + 32
        // change temperature to dff units
        temperatureSection.addEventListener("click",()=>{
          if ((temperatureSpan).textContent ==="F"){
            temperatureSpan.textContent = "C"
            temperatureDegree.textContent = Math.floor(celsius)
          }else{
            temperatureSpan.textContent ="F"
            temperatureDegree.textContent = Math.floor(faren)
          }

        })

      })

    });
  }

  function setIcons(iconID){
    const skycons = new Skycons({color:"white"})
    // const currentIcon = icon

    if (iconID === "01d") {
     skycons.set("icon1", "clear-day");
   } else if (iconID === "01n") {
     skycons.set("icon1", "clear-night");
   } else if (iconID === "02d") {
     skycons.set("icon1", "partly-cloudy-day");
   } else if (iconID === "02n") {
     skycons.set("icon1", "partly-cloudy-night");
   } else if (iconID === "03d" || iconID === "03n" || iconID === "04d" || iconID === "04n") {
     skycons.set("icon1", "cloudy");
   } else if (iconID === "09d" || iconID === "09n") {
     skycons.set("icon1", "rain");
   } else if (iconID === "10d" || iconID === "10n" || iconID === "11d" || iconID === "11n") {
     skycons.set("icon1", "sleet");
   } else if (iconID === "13d" || iconID === "13n") {
     skycons.set("icon1", "snow");
   } else {
     skycons.set("icon1", "fog");
   };
   skycons.play();
 };

})
