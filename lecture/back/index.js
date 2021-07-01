"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var dotenv_1 = __importDefault(require("dotenv"));
var passport_1 = __importDefault(require("passport"));
var hpp_1 = __importDefault(require("hpp"));
var helmet_1 = __importDefault(require("helmet"));
var passport_2 = __importDefault(require("./passport"));
var models_1 = require("./models");
var user_1 = __importDefault(require("./routes/user"));
var post_1 = __importDefault(require("./routes/post"));
// import postsRouter from './routes/posts'
// import hashtagRouter from './routes/hashtag'
dotenv_1["default"].config();
var app = express_1["default"]();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);
passport_2["default"]();
models_1.sequelize.sync({ force: false })
    .then(function () {
    console.log('데이터베이스 연결 성공');
})["catch"](function (err) {
    console.error(err);
});
if (prod) {
    app.use(hpp_1["default"]());
    app.use(helmet_1["default"]());
    app.use(morgan_1["default"]('combined'));
    app.use(cors_1["default"]({
        origin: /nodebird\.com$/,
        credentials: true
    }));
}
else {
    app.use(morgan_1["default"]('dev'));
    app.use(cors_1["default"]({
        origin: true,
        credentials: true
    }));
}
app.use('/', express_1["default"].static('uploads'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use(cookie_parser_1["default"](process.env.COOKIE_SECRET));
app.use(express_session_1["default"]({
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
app.use(passport_1["default"].initialize());
app.use(passport_1["default"].session());
app.use('/user', user_1["default"]);
app.use('/post', post_1["default"]);
// app.use('/posts', postsRouter);
// app.use('/hashtag', hashtagRouter);
app.get('/', function (req, res, next) {
    res.send('react nodebird 백엔드 정상 동작!');
});
app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('서버 에러 발생! 서버 콘솔을 확인하세요.');
});
app.listen(app.get('port'), function () {
    console.log("server is running on " + app.get('port'));
});
