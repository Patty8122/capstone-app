// import mongoose from 'mongoose';

// const yourSchema = new mongoose.Schema({
//     'name': String,
//     'imageURL': String
// });


// const YourModel = mongoose.model('users', yourSchema);


// export default YourModel;


import mongoose from 'mongoose';

const yourSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    email: String,
});

const YourModel = mongoose.models.users || mongoose.model('users', yourSchema);

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://divyapattisapu:pwd963@cluster0.qcfhkzf.mongodb.net/tempDB?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to database');
    } catch (error) {
        console.log('Database connection error:', error);
    }
}

async function disconnectDB() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from database');
    } catch (error) {
        console.log('Database disconnection error:', error);
    }
}

export { connectDB, disconnectDB, YourModel };
