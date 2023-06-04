
import mongoose from 'mongoose';

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

async function insertDocument(doc) {
    await connectDB();
  
    try {
      const yourSchema = new mongoose.Schema({
          'name': String,
          'imageURL': String,
          'email': String,
      });

      console.log("doc", doc)
      
      
      let YourModel = mongoose.model('users', yourSchema);
  
    //   console.log("docs", YourModel.find({}));
      
      const newDocument = new YourModel({
          name: doc.name,
          imageURL: doc.imageURL,
        email: doc.email,
      });
  
      await newDocument.save();
  
      console.log('Document inserted successfully');
    } catch (error) {
      console.log('Error inserting document:', error);
    }

    await disconnectDB();
  }
  

async function checkUserExists(curr_email) {
    await connectDB();

    try {
        // check if user exists
        const yourSchema = new mongoose.Schema({
            'name': String,
            'imageURL': String,
            'email': String,
        });
        let YourModel = mongoose.model('users', yourSchema);
        const user = await YourModel.findOne({ email: curr_email });
        console.log("user", user);
        if (user!==null) {
            return true;
        }
        return false;
    } catch (error) {
        console.log('Error checking if user exists:', error);
    }

    await disconnectDB();

}

export default function handler(req, res) {
    // Process the data received from the client-side
    const { name, imageURL, email } = req.body;

    // check if user exists
    let userExists = checkUserExists(email);

    if (userExists===true) {
        res.status(200).json({ message: 'User already exists' });
        return;
    }

    // update the database using insertDocument
    insertDocument({ "name":name, "imageURL":imageURL , "email": email});

    // Send a response back to the client-side
    res.status(200).json({ message: 'Data received and processed successfully' });
}