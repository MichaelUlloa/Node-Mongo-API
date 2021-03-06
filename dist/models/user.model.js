"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usernam: { type: String, required: true },
    createdat: { type: Date, default: Date.now }
});
exports.default = mongoose_1.model('User', UserSchema);
