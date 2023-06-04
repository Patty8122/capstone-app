import mongoose from 'mongoose';

const yourSchema = new mongoose.Schema({
    'name': String,
    'imageURL': String
});


const YourModel = mongoose.model('users', yourSchema);


export default YourModel;
