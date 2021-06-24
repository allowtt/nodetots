"use strict";
exports.__esModule = true;
var express = require("express"); //express는 export default가 없어서 * as 반드시 써줘야됨
var morgan = require("morgan");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var dotenv = require("dotenv");
var passport = require("passport");
var hpp = require("hpp");
var helmet = require("helmet");
var models_1 = require("./models");
dotenv.config();
var app = express();
var prod = process.env.NODE_ENV === 'production';
console.log(prod);
app.set('port', prod ? process.env.PORT : 3065);
models_1.sequelize.sync({ force: false })
    .then(function () {
    console.log('db성공');
})["catch"](function (err) {
    console.error(err);
});
if (prod) {
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin: /nodebird\.com$/,
        credentials: true
    }));
}
else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: true,
        credentials: true
    }));
}
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        domain: prod ? '.nodebird.com' : undefined
    },
    name: 'rnbck'
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/', function (req, res, next) {
    res.send('백엔드 정상 동작 확인');
});
app.listen(app.get('port'), function () {
    console.log("server is running " + app.get('port'));
});
//변경해주고 자바스크립트로바꿔준다.
//npm i -D tsnode 개발용에서 타입스크립트를 실행
//npx ts-node index.ts
//npx tsc -> 타입스크립트 파일을 자바스크립트로 바꿔준다.
//tsc --traceResolution -> js로 컴파일할때 어떻게 찾아오는지 보여준다.
//바벨노드?
//
