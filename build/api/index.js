"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var resize_1 = __importDefault(require("./resize"));
var image = express_1.default.Router();
image.get("/api", resize_1.default, function (req, res) {
    var query = req.query;
    var imgExport = "assets/thumb/".concat(query.filename, ".jpg");
    try {
        res.status(200).sendFile(path_1.default.resolve(imgExport));
    }
    catch (error) {
        res.status(404).send("Image query error, please check query");
    }
});
exports.default = image;
