// document.addEventListener("DOMContentLoaded", () => {


const changeButton = document.getElementById('mainbutton');
const inputWord = document.getElementById('inputId');
const cityChanger = document.getElementById('city')
const wind = document.getElementById('wind')
const wet = document.getElementById('wet')
const img = document.getElementById('img')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const time = document.getElementById('time')

changeButton.addEventListener('click', async (e) => {
  const city = inputWord.value;
  const response = await fetch(`/getweather?city=${city}`);
  const getWeather = await response.json();
  console.log('11111111', getWeather.weather[0].icon);
  cityChanger.innerText = getWeather.name
  wind.innerText = getWeather.wind.speed
  wet.innerText = getWeather.main.humidity
  const findimg = getWeather.weather[0].icon
  img.src = `https://openweathermap.org/img/wn/${findimg}@2x.png`
  description.innerText = getWeather.weather[0].description
  const findtemp = getWeather.main.temp
  temp.innerText = `${findtemp}° C`
  pressure.innerText = getWeather.main.pressure
  let date = new Date()
  let hours = date.getHours()
  let minute = date.getMinutes()


  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy + '  ' + hours + ':' + minute
  // console.log(today);
  time.innerText = today



  let message = `${findtemp}° C`
  console.log(message);
  let url = 'https://api.telegram.org/bot5032497935:AAG9dK1llmlWl7TRx9isfeTrE16xNllG7As/sendMessage?chat_id=1286681641&text='
  let xhttp = new XMLHttpRequest();
  xhttp.open("GET", url + "Город" + ":" + city + '  ' + "температура" + ":" + message + '     ' + 'осадки' + ':' + getWeather.weather[0].description, true)
  xhttp.send()

});


  // async function getWeather() {
  //   const response = await fetch(`/index?city=Москва`);
  //   const { getWeather } = await response.json();
  //   console.log(getWeather.main.temp);
  // };

  // getWeather()
// })
