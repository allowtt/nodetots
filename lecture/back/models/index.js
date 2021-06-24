"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
var user_1 = require("./user");
var comment_1 = require("./comment");
var hashtag_1 = require("./hashtag");
var image_1 = require("./image");
var post_1 = require("./post");
__exportStar(require("./sequelize"), exports); //임포트함과 동시에 익스포트하는거
var db = {
    User: user_1["default"],
    Comment: comment_1["default"],
    Hashtag: hashtag_1["default"],
    Image: image_1["default"],
    Post: post_1["default"]
};
user_1.associate(db);
