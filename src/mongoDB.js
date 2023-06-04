// import mongoose from 'mongoose';
// import { list } from 'postcss';

// const uri = 'mongodb+srv://divyapattisapu:pwd963@cluster0.qcfhkzf.mongodb.net/tempDB?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas connection string
// // mongoose.connect(uri);

// // Create a reusable connection promise

// export default async function connectToDatabase() {
//   if (mongoose.connection) {
//     console.log(mongoose.connection.readyState);
//     if (mongoose.connection.readyState == 1) {
//       // Assuming you have already connected to MongoDB using Mongoose

//       // Retrieve a reference to the MongoDB database
//       const db = mongoose.connection.db;
//       console.log(db);

//       // List all collections
//       db.listCollections().toArray((err, collections) => {
//         console.log("inside list collections", collections);
//         if (err) {
//           console.error('Error listing collections:', err);
//           return;
//         }

//         console.log("collection names");
//         // Print the names of all collections
//         collections.forEach((collection) => {
//           console.log(collection.name);

//         });
//       });

//       return;
//     }


//     return mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//   }
// } // const mongoose = require('mongoose');


// async function listCollectionsDatabase() {


//   const collectionSchema = new mongoose.Schema({
//     'name': String,
//     'imageURL': String
//   });

//   let usersModel = mongoose.model('users', collectionSchema);
//   // list all documents in the collection
//   usersModel.find({}, function (err, docs) {
//     if (err) return console.error(err);
//     console.log(docs);
//   });
// }
// console.log("list collections line 60");
// listCollectionsDatabase();

// export { listCollectionsDatabase };
// // const CollectionModel = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);



// // export async function updateCollection(data) {
// //   try {
// //     const CollectionModel = mongoose.model('collection');
// //     await CollectionModel.findByIdAndUpdate(documentId, { $set: data });
// //     console.log('Collection updated successfully');
// //   } catch (error) {
// //     console.error('Error updating collection:', error);
// //   }

// // }



// async function updateCollection(documentId, data) {
//   try {
//     const CollectionModel = mongoose.model('Collection');
//     await CollectionModel.findByIdAndUpdate(documentId, { $set: data });
//     console.log('Collection updated successfully');
//   } catch (error) {
//     console.error('Error updating collection:', error);
//   }
// }


// async function updateData() {
//   try {
//     const CollectionModel = mongoose.model('Collection');

//     const document = await CollectionModel.findOne({ name: 'collection' });
//     console.log(document);
//     if (document) {
//       const documentId = document._id.toString();
//       const dataToUpdate = { /* Specify the fields and values to update */ };
//       await updateCollection(documentId, dataToUpdate);
//     } else {
//       console.log('Collection not found');
//     }
//   } catch (error) {
//     console.error('Error finding collection:', error);
//   }
// }

// export { updateData };




// // mongoose.connection.once('open', async () => {
// //   try {
// //     const CollectionModel = mongoose.model('Collection');
// //     const document = await CollectionModel.findOne({ name: 'collection' });
// //     if (document) {
// //       const documentId = document._id.toString();
// //       const dataToUpdate = { /* Specify the fields and values to update */ };
// //       await updateCollection(documentId, dataToUpdate);
// //     } else {
// //       console.log('Collection not found');
// //     }
// //   } catch (error) {
// //     console.error('Error finding collection:', error);
// //   }
// // });

// // mongoose.connect(uri, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // });


import mongoose from 'mongoose';

export async function connectDB() {
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

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from database');
  } catch (error) {
    console.log('Database disconnection error:', error);
  }
}
