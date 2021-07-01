"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.associate = void 0;
var sequelize_1 = require("sequelize");
var sequelize_2 = __importDefault(require("./sequelize"));
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Image;
}(sequelize_1.Model));
Image.init({
    src: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize: sequelize_2["default"],
    modelName: 'Image',
    tableName: 'image',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
var associate = function (db) {
};
exports.associate = associate;
exports["default"] = Image;
