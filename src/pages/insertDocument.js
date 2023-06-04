import {connectDB} from '../mongoDB';
import mongoose from 'mongoose';

export default async function insertDocument(doc) {
  await connectDB();

  try {
    const yourSchema = new mongoose.Schema({
        'name': String,
        'imageURL': String
    });
    
    
    const YourModel = mongoose.model('users', yourSchema);

    console.log("docs", YourModel.find({}));
    
    const newDocument = new YourModel({
        name: doc.name,
        imageURL: doc.imageURL,
    });

    await newDocument.save();

    console.log('Document inserted successfully');
  } catch (error) {
    console.log('Error inserting document:', error);
  }
}

