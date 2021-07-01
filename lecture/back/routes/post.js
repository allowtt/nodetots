"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var express_1 = __importDefault(require("express"));
var multer_1 = __importDefault(require("multer"));
var multer_s3_1 = __importDefault(require("multer-s3"));
var path_1 = __importDefault(require("path"));
var middleware_1 = require("./middleware");
var post_1 = __importDefault(require("../models/post"));
var hashtag_1 = __importDefault(require("../models/hashtag"));
var image_1 = __importDefault(require("../models/image"));
var router = express_1["default"].Router();
aws_sdk_1["default"].config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});
var upload = multer_1["default"]({
    storage: multer_s3_1["default"]({
        s3: new aws_sdk_1["default"].S3(),
        bucket: 'react-nodebird',
        key: function (req, file, cb) {
            cb(null, "original/" + +new Date() + path_1["default"].basename(file.originalname));
        }
    }),
    limits: { fileSize: 20 * 1024 * 1024 }
});
router.post('/', middleware_1.isLoggedIn, upload.none(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hashtags, newPost, promises, result, promises, images, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                hashtags = req.body.content.match(/#[^\s]+/g);
                return [4 /*yield*/, post_1["default"].create({
                        content: req.body.content,
                        UserId: req.user.id
                    })];
            case 1:
                newPost = _a.sent();
                if (!hashtags) return [3 /*break*/, 4];
                promises = hashtags.map(function (tag) { return hashtag_1["default"].findOrCreate({
                    where: { name: tag.slice(1).toLowerCase() }
                }); });
                return [4 /*yield*/, Promise.all(promises)];
            case 2:
                result = _a.sent();
                return [4 /*yield*/, newPost.addHashtags(result.map(function (r) { return r[0]; }))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!req.body.image) return [3 /*break*/, 7];
                if (!Array.isArray(req.body.image)) return [3 /*break*/, 7];
                promises = req.body.image.map(function (image) { return image_1["default"].create({ src: image }); });
                return [4 /*yield*/, Promise.all(promises)];
            case 5:
                images = _a.sent();
                return [4 /*yield*/, newPost.addImages(images)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                console.error(error_1);
                return [2 /*return*/, next(error_1)];
            case 9: return [2 /*return*/];
        }
    });
}); });
exports["default"] = router;