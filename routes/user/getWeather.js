// const fetch = require('node-fetch');
import nodeFetch from 'node-fetch';
import router from 'express';

import telegramApi from 'node-telegram-bot-api'

/////////////
// const token = '5032497935:AAG9dK1llmlWl7TRx9isfeTrE16xNllG7As'

// const bot = new telegramApi(token, { polling: true })

// bot.onText(/getLocation/, (msg) => {
//   const opts = {
//     reply_markup: JSON.stringify({
//       keyboard: [
//         [{text: 'Location', request_location: true}],
//         [{text: 'Contact', request_contact: true}],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     }),
//   };
//   bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);
// });

// bot.on('location', (msg) => {
//   console.log(msg.location.latitude);
//   console.log(msg.location.longitude);
// });

// const start = async () => {


//   bot.on('message', async msg => {   
//     const chatId = msg.chat.id;
//     const opts = {
//       reply_markup: JSON.stringify({
//         keyboard: [
//           [{text: 'Location', request_location: true}],
//           [{text: 'Contact', request_contact: true}],
//         ],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       }),
//     };
//     bot.sendMessage(msg.chat.id, 'Contact and Location request', opts);

//     // return bot.sendMessage(chatId, 'Отгадывай', {
//     //   reply_markup: JSON.stringify({
//     //     inline_keyboard: [
//     //       [{ text: 'уфа', callback_data: '1' }, { text: 'ижевск', callback_data: '2' }],
//     //     ]
//     //   })
//     // });
//   })

//   bot.on('callback_query', async msg => {
//     const data = msg.data;
//     console.log(data);   
//   })
// }

// start()
// bot.onText(/\/start/, function onPhotoText(msg) {
//   bot.sendGame(msg.chat.id, 'gameName');
// });

// Handle callback queries
// bot.on('callback_query', function onCallbackQuery(callbackQuery) {
//   console.log('22222222',callbackQuery);
//   bot.answerCallbackQuery(callbackQuery.id, { url: 'url' });
// });



let mainWeather = {
  Thunderstorm: "⛈",
  Drizzle: "💧",
  Rain: "🌧",
  Snow: "❄️",
  Mist: "🌫",
  Clear: "☀️",
  Clouds: "🌥",
}

const token = '5032497935:AAG9dK1llmlWl7TRx9isfeTrE16xNllG7As'
const bot = new telegramApi(token, { polling: true })



bot.on('location', async (msg) => {
  const chatId = msg.chat.id;
  const lat = msg.location.latitude;
  const lon = msg.location.longitude;
  const weather2 = await nodeFetch(`https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=1&units=metric&lang=ru&appid=8e5c6503d1da5413d7e9572338ff04ac`)
  const getWeather2 = await weather2.json();
  bot.sendMessage(chatId, `Город:${getWeather2.list[0].name}  температура:${getWeather2.list[0].main.temp}° C    ${mainWeather[getWeather2.list[0].weather[0].main]} осадки:${getWeather2.list[0].weather[0].description}`);
});

bot.on('message', async msg => {
  console.log('11111111',msg);
  const chatId = msg.chat.id;
  if (!msg.text) {
    return 
  }
  try {
    const weather1 = await nodeFetch(`https://api.openweathermap.org/data/2.5/weather?q=${msg.text}&units=metric&lang=ru&appid=8e5c6503d1da5413d7e9572338ff04ac`);
    const getWeather1 = await weather1.json();
    if (!getWeather1.name) {
      return bot.sendMessage(msg.chat.id , 'нет такого города');
    }
    bot.sendMessage(chatId, `Город:${getWeather1.name}  температура:${getWeather1.main.temp}° C    ${mainWeather[getWeather1.weather[0].main]} осадки:${getWeather1.weather[0].description}`);
    const opts = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{text: 'Location', request_location: true}],       
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      }),
    };
    bot.sendMessage(msg.chat.id , 'или можете отправить локацию', opts);
  } catch (e) {
    console.log('error', e.message);
  }
})


const a = router.Router();

a.get('/', async (req, res) => {
  console.log('1111111111', req.query);
  const { city } = req.query;
  console.log(city);
  const weather = await nodeFetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=8e5c6503d1da5413d7e9572338ff04ac`);
  const getWeather = await weather.json();
  res.json(getWeather);
  console.log(getWeather);
});


export default a;


