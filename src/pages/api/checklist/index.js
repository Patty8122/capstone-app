import { check_list } from '../../../data/checklist';
import { OpenAIApi, Configuration } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const runPrompt = async (prompt) => {

  // add role as a message to send to openai
  // console.log("prompt: ", prompt);


  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt + " in a single line",
    max_tokens: 1000,
    // temperature: 1, // random if > 1
  });

  // console.log(response.data);
  // console.log(response.data.choices);
  // console.log(response.data.choices[0]);

  return response.data.choices[0].text;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cleanResponse(response) {
  // clean the response from openai
  // return the cleaned response
  // 
  // find the first = sign
  const first = response.indexOf('{');
  // console.log('first: ', first)

  // find the first } sign
  const second = response.indexOf('}', first);
  // console.log('second: ', second)

  // find the second } sign
  const third = response.indexOf('}', second + 1);
  // console.log('third: ', third)

  // slice the string from the first equals to the sixth backtick
  const cleanedResponse = response.slice(first, third + 1);
  // console.log('66: ', cleanedResponse)

  // replace the \n with a ''
  const cleanedResponse2 = cleanedResponse.replace(/\\n/g, '');
  // console.log('70: ', cleanedResponse2)

  // convert string (dictionary) to object
  const cleanedResponse3 = JSON.parse(cleanedResponse2);
  // console.log('74: ', cleanedResponse3)




  // return the object
  return cleanedResponse3;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { connectDB, disconnectDB, YourModel } from './checklistsModel';

// async function insertDocument(doc) {
//   await connectDB();

//   try {
//     const newDocument = new YourModel({
//       email: doc.email,
//       name: doc.name,
//       tasklist: doc.tasklist,
//     });

//     // console.log("85 newDocument", newDocument)

//     await newDocument.save();

//     console.log('Document inserted successfully');
//   } catch (error) {
//     console.log('Error inserting document:', error);
//   }

//   await disconnectDB();

//   // return newDocument._id;
// }

async function insertDocument(doc, id_parent) {
  await connectDB();

  // if the document has a parent then it is a subtask

  if (false //id_parent === undefined
    ) {
    console.log('insertDocument id_parent is EMPTY: ', id_parent)

  try {
    const newDocument = new YourModel({
      email: doc.email,
      name: doc.name,
      tasklist: doc.tasklist,
    });

    // console.log("85 newDocument", newDocument)

    await newDocument.save();

    console.log('Document inserted successfully');
  } catch (error) {
    console.log('Error inserting document:', error);
  }
}

else {
    try {
        const newDocument = new YourModel({
        email: doc.email,
        name: doc.name,
        tasklist: doc.tasklist,
        id_parent: id_parent,
        });
    
        // console.log("85 newDocument", newDocument)
    
        await newDocument.save();
    
        console.log('137 -------- Document inserted successfully');
    } catch (error) {
        console.log('Error inserting document:', error);
    }
}
  await disconnectDB();
}




///////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // check if checklist_request is empty
    if (req.body === '') {
      console.log('checklist_request is empty: ', req.body)
      return res.status(404).json({ "req.body": req.body })
    }

    const body = req.body
    console.log('body: ', body)
      

    // make a call to openai
    let final_request = 'Please make a checklist for ' + body.checklist_request + ' with a timeline in the form of a JSON parsable string of the format keys as \{"name":"title", "tasklist": \{"task": time to complete task\}\}.'
    console.log('final_request: ', final_request);

    // while loop to keep trying to get a parsable response
    while (true) {
      const response = await runPrompt(final_request);
      try {
        var cleanedResponse = cleanResponse(response);
        break;
      } catch (error) {
        continue;
      }
    }


    // console.log('cleanedResponse: ', cleanedResponse)

    // check if id_parent is empty
    if (body.id_parent === undefined) {
      console.log('id_parent is EMPTY: ', body.id_parent)
      await insertDocument({
      "email": body.email,
      // "name": cleanedResponse.name,
      "name": body.checklist_request,
      "tasklist": cleanedResponse.tasklist,
    });
    }

    else {
      await insertDocument({
        "email": body.email,
        // "name": cleanedResponse.name,
        "name": body.checklist_request,
        "tasklist": cleanedResponse.tasklist,
      }, body.id_parent);
    }


    console.log("returning 141 ", {
      // "id": id,
      "email": body.email,
      "name": cleanedResponse.name,
      "tasklist": cleanedResponse.tasklist,
    })

    // Send a response back to the client-side
    try {
      res.status(200).json({
        "message": "Checklist received and processed successfully", 
        "check_list": {
          // "id": id,
          "email": body.email,
          "name": cleanedResponse.name,
          "tasklist": cleanedResponse.tasklist,
        }
      })
    } catch (error) {
      console.log('Error handling request:', error);
      res.status(500).json({ message: 'Internal server error' });
    }


  }


  // process the GET request
  // query the database for the checklists with the email

  if (req.method === 'GET') {
    // alert('req.query.email: ', req.query.email);
    if (req.headers.email === '') {
      return res.status(404).json({ "req.headers.email": req.headers.email })
    }

    const email = req.headers.email
    console.log('email: ', email)

    // search the database for the email
    await connectDB();

    try {
      // all documents in the collection YourModel with the email will be returned
      const newDocument = await YourModel.find({ email: email });
      // console.log('Document found', newDocument);
      res.status(200).json({ "check_list":newDocument })
    }
    catch (error) {
      console.log('Error searching for document:', error);
      res.status(500).json({});
    }
    
    await disconnectDB();

  }


}