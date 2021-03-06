"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.Routes();
    }
    Routes() {
        this.router.get('/', (req, res) => res.send('Api: /api/posts'));
    }
}
const indexRouter = new IndexRoutes();
indexRouter.Routes();
exports.default = indexRouter.router;
