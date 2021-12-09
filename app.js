// const newRouter = require('./routes/user/newroute');

import express from 'express';
// import app from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import FileStore from 'session-file-store';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



import mainRouter from './routes/main.js';
import indexRouter from './routes/weather.js';
import getweatherRouter from './routes/user/getWeather.js';

const Query = FileStore(session);


const app = express();

const sessionConfig = {
  name: 'sid',
  store: new Query(),
  secret: process.env.SESSION_SECRET ?? ['keyboard cat', 'old keyword'],
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 сутки
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfig));
app.use(cookieParser());

function isLogin(req, res, next) {
  if (!req.session.userName) {
    res.redirect('/login');
  }
  next();
}

app.use('/', mainRouter);

app.use('/weather', indexRouter);

app.use('/getweather', getweatherRouter);


// https://api.telegram.org/bot5032497935:AAG9dK1llmlWl7TRx9isfeTrE16xNllG7As/getUpdates
// https://api.telegram.org/bot5032497935:AAG9dK1llmlWl7TRx9isfeTrE16xNllG7As/sendMessage?chat_id=1286681641&text=hi_i_am_bot


export default app;
