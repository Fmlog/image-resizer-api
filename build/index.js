"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./api/index"));
var app = (0, express_1.default)();
var PORT = 3000;
app.use("/", index_1.default);
app.get("", function (req, res) {
    res.status(200).send("Image resizer");
});
app.listen(PORT, function () {
    console.log("Server running on http://localhost:" + PORT);
});
exports.default = app;
