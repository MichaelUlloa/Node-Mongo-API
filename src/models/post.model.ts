import {Schema, model} from 'mongoose';

const postSchema = new Schema({
    title: {type: String, required: true},
    url: {type: String, required: true, lowercase: true},
    content: {type: String, required: true},
    image: String,
    createdat: {type: Date, default: Date.now },
    updatedat: Date
});

export default model('Post', postSchema);