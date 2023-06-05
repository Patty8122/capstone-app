import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';

import Sidebar from '../components/sidebar';
import RootLayout from './layout';

import Nav from '../components/landing_page/nav';
import Center from '../components/landing_page/center';
import Features from '../components/landing_page/features';
import Animation from '../components/wavesanimation';


import ChecklistPage from './checklistPage';
import { render } from 'react-dom';

import { useState } from 'react';
import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

// import {connectDB, disconnectDB} from '../mongoDB';
// import YourModel from './usersModel';
// import insertDocument from './insertDocument';
// import {authDetails} from './api/auth/authDetails';

// const uri = 'mongodb+srv://divyapattisapu:pwd963@cluster0.qcfhkzf.mongodb.net/tempDB?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas connection string
// // connect to MongoDB
// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// const collectionSchema = mongoose.Schema({
//     'name': String,
//     'imageURL': String
// });

// console.log("inside list collections");
// const usersModel = mongoose.model('users', collectionSchema);
//   // list all documents in the collection
// usersModel.find({}, function (err, docs) {
//     if (err) return console.error(err);
//     console.log(docs);
// });
// useEffect(() => {
//   window.addEventListener('scroll', isSticky);
//   return () => {
//     window.removeEventListener('scroll', isSticky);
//   };
// });

// /* Method that will fix header after a specific scrollable */
// const isSticky = (e) => {
//   const header = document.querySelector('#header-section');
//   header.classList.add('is-sticky')
//   //     const scrollTop = window.scrollY;
//   // scrollTop >= 250 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
// };
//   render (
//     <div>
//         <Animation />
//     </div>
// )

// connectToDatabase();
// listCollectionsDatabase();

// const uri = 'mongodb+srv://divyapattisapu:pwd963@cluster0.qcfhkzf.mongodb.net/tempDB?retryWrites=true&w=majority'; // Replace with your MongoDB Atlas connection string

// useEffect(() => {
    //     // Connect to MongoDB
    //     console.log("inside use effect")
    //     mongoose.connect(uri, {
        //         useNewUrlParser: true,
        //         useUnifiedTopology: true
        //     });

    //     // Define the model
    //     const collectionSchema = new mongoose.Schema({
    //         name: String,
    //         imageURL: String
    //     }, []);

    //     const usersModel = mongoose.model('users', collectionSchema);

    //     // Query the collection
    //     usersModel.find({}, function (err, docs) {
    //         if (err) return console.error(err);
    //         console.log(docs);
    //     });
    // }, []); // Empty dependency array to run the effect only once

const userSend = async (user) => {

    const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({"name": user.name, "imageURL": user.image, "email": user.email}),
    });

    const data = await res.json();

    console.log(data);
    return data;

};



export default function Home() {
    const { data, status } = useSession();
    const [userSent, setUserSent] = useState(false);
    
    
    useEffect(() => {
        if (status === 'authenticated' && data && data.user && !userSent) {
            console.log(data.user)
            console.log(userSend(data.user));

        setUserSent(true);
      }
    }, [status, userSent]);
  

    if (status === 'loading') return <h1> Loading... please wait</h1>;
    if (status === 'authenticated') {
        return (
            <div>
                <Nav data={data}/>
                <Center />
                <Features userdata={data}/>
            </div>
        );
    }
    return (

        <div>
                <Nav />
                <Center />
                <Features />
        </div>
    );
}

// export async function getServerSideProps(context) {
//     await connectDB();
//     // Retrieve the session data on the server-side
//     const session = await getSession(context);

//     // Replace with the appropriate way to access session data based on your authentication setup
//     const sessionData = {
//       user: {
//         name: session.user.name,
//         image: session.user.image,
//       },
//     };
//     await insertDocument({
//         name: data.user.name,
//         imageURL: data.user.image,
//     });
//     await disconnectDB();
//     return {
//         props: {},
//     };
// }



// export default function Home({ documents }) {
//     return (
//         <div>
//             <h1>Documents</h1>
//             {/* Display the documents */}
//             {documents.map((doc) => (
//                 <div key={doc._id}>
//                     <h3>{doc.name}</h3>
//                     <p>{doc.imageURL}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export async function getStaticProps() {
//     await connectDB();

//     try {
//         const documents = await YourModel.find({}); // Replace 'YourModel' with the actual name of your Mongoose model

//         let docs = JSON.parse(JSON.stringify(documents));
//         console.log("docs", docs);
//         return {
//             props: {
//                 documents: docs,
//             },
//         };
//     } catch (error) {
//         console.log('Error fetching documents:', error);
//         await disconnectDB();
//         return {
//             props: {
//                 documents: [],
//             },
//         };
//     } finally {
//         await disconnectDB();
//     }
    

// }

// server side rendering to insertDocument into the database
// export async function getServerSideProps() {
//     await connectDB();
//     const { data, status } = useSession();

//     await insertDocument({
//         name: data.user.name,
//         imageURL: data.user.image,
//     });
//     await disconnectDB();
//     return {
//         props: {},
//     };
// }
    


