import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        default: 'https://png.pngtree.com/background/20230613/original/pngtree-low-picture-image_3429782.jpg',
    },
    
}, {timestamps: true});


const User = mongoose.model('User', userschema);

export default User;