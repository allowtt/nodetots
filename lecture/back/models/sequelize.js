"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
//순환참조때문에 sequelize.ts만들었다.  
var sequelize_1 = require("sequelize");
var config_1 = require("../config/config");
var env = process.env.NODE_ENV || 'development';
var _a = config_1["default"][env], database = _a.database, username = _a.username, password = _a.password;
var sequelize = new sequelize_1.Sequelize(database, username, password, config_1["default"][env]);
exports.sequelize = sequelize;
exports["default"] = sequelize;