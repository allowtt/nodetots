const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

dotenv.config();

//라우터
const authRouter = require('./routes/auth');

const {sequelize} = require('./models');

const app = express();

// nunjucks.configure('views', {
//     express: app,
//     watch: true,
//   });
  
//   sequelize.sync({force: false})
//       .then(() => {
//           console.log('db연결 성공');
//       })
//       .catch((err) => {
//           console.error(err);
//       });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));


app.set('port', process.env.PORT || 9000);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.log(err.message);
    console.log(err);
});

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}포트 대기중`);
});