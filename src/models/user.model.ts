import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    usernam: {type: String, required: true},
    createdat: {type: Date, default: Date.now },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});



export default model('User', UserSchema);