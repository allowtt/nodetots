"use strict";
exports.__esModule = true;
var express = require("express"); //express는 export default가 없어서 * as 반드시 써줘야됨
var app = express();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);
app.get('/', function (req, res, next) {
    res.send('백엔드 정상 동작 확인');
});
app.listen(app.get('port'), function () {
    console.log("server is running " + app.get('port'));
});
