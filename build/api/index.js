"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var image_processor_1 = __importDefault(require("./image_processor"));
var image = express_1.default.Router();
image.get("/api/image", image_processor_1.default, function (req, res) {
    var query = req.query;
    var imgExport = "assets/thumb/".concat(query.filename, "_").concat(query.height, "_").concat(query.width, ".jpg");
    try {
        res.status(200).sendFile(path_1.default.resolve(imgExport));
    }
    catch (error) {
        res.send("Something went wrong ".concat(error));
    }
});
exports.default = image;
