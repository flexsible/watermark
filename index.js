"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./routers"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
(0, routers_1.default)(app);
console.log(`Attempting to start server on port ${port}`);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
