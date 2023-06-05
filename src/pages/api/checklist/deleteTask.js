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
  
      await insertDocument({
        "email": body.email,
        "name": cleanedResponse.name,
        "tasklist": cleanedResponse.tasklist,
      });
  
  
      console.log("returning 141 ", {
        "email": body.email,
        "name": cleanedResponse.name,
        "tasklist": cleanedResponse.tasklist,
      })
  
      // Send a response back to the client-side
      try {
        res.status(200).json({
          "message": "Checklist received and processed successfully", 
          "check_list": {
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
      // await connectDB();
  
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
      
      // await disconnectDB();
  
    }
  
  
  }