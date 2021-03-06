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
const post_model_1 = __importDefault(require("../models/post.model"));
class PostRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield post_model_1.default.find();
            return res.json(posts);
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paramUrl = req.params.url;
            const post = yield post_model_1.default.findOne({ url: paramUrl });
            return res.json(post);
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { title, url, content, image } = req.body;
            const newPost = new post_model_1.default({ title, url, content, image });
            yield newPost.save();
            res.json({ data: newPost });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const updatedPost = yield post_model_1.default.findOneAndUpdate({ url }, req.body, { new: true });
            return res.json(updatedPost);
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            yield post_model_1.default.findOneAndDelete({ url });
            return res.json({ message: 'Post deleted.' });
        });
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRouter = new PostRoutes();
exports.default = postRouter.router;
