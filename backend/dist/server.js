"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 5000;
app.get("/login", (req, res) => {
    res.send('<h1 style ="text-align: center">this is your login page</h1>');
});
app.get("/", (req, res) => {
    res.send('<h1 style ="text-align: center">this is home page</h1> <a style = "font-size : 20 ; font-weight: bold;"href ="http://localhost:5000/login">log in</a>');
});
app.listen(port, () => {
    console.log(`your first server is running on port : ${port}`);
});
