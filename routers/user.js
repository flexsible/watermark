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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const uploads = (0, multer_1.default)({ dest: 'public/uploads' });
function users() {
    const router = (0, express_1.Router)();
    router
        .get('/', (req, res, next) => {
        res.json({
            id: 1,
            firstname: 'Matt',
            lastname: 'Morgan',
        });
    })
        .post('/avatar', uploads.single('avatar'), (req, res, next) => {
        if (!!req.file) {
            res.json({
                url: `/uploads/${req.file.filename}`,
            });
        }
        else {
            next(new Error('No file found'));
        }
    })
        .post('/watermark', uploads.single('file'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (!!req.file) {
            const watermark = (0, sharp_1.default)(yield (0, promises_1.readFile)(req.file.path)).composite([
                { input: yield (0, promises_1.readFile)((0, path_1.resolve)('./images/wm.png')), left: -30, top: -100 }
            ]).png().toBuffer();
            const fileName = `watermarked-${Date.now()}.png`;
            yield (0, promises_1.writeFile)((0, path_1.resolve)(`./public/uploads/${fileName}`), yield watermark);
            res.json({
                url: `/uploads/${fileName}`,
            });
        }
        else {
            next(new Error('No file found'));
        }
    }));
    return router;
}
exports.default = users;
function generateDoc(filename) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Avatar</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>My Avatar</h1>
    <img src="/uploads/${filename}" alt="" />
</body>
</html>
`;
}
