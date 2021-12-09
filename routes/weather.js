// const router = require('express').Router();
import nodeFetch from 'node-fetch';
import router from 'express';

const a = router.Router();

// const { Entry, User } = require('../db/models');

a.get('/', async (req, res) => {
  res.render('weather')
  // // console.log('1111111111', req.query);
  // const { city = 'Москва' } = req.query;
  // console.log('2222222222', city);
  // // const user = await nodeFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=56.86&lon=53.23&exclude=hourly,daily&units=${req.query.units}&appid=8e5c6503d1da5413d7e9572338ff04ac`);
  // const weather = await nodeFetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=8e5c6503d1da5413d7e9572338ff04ac`);
  // const getWeather = await weather.json();
  // // console.log({ ...getWeather, date: { month: (new Date()).getMonth(), time: (new Date()).getTime() } });
  // // res.json({ getWeather });
  // // const time = new Date()
  // // console.log('222222222222', time);

  // const check = getWeather.main.temp;
  // console.log('1111111', check);

  // if (check) {
  //   return res.render('index', { check });
  // }
});
export default a;
