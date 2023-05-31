import { check_list } from '../../../data/checklist'
// import {runPrompt} from "./openai_call";
import { useEffect } from 'react';
import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { OpenAIApi, Configuration } from "openai";



// importing the openai api
//const DynamicComp = dynamic(() => import(('openai-api')('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')));

// const DynamicComp = dynamic(() => import('./openai_call'));





const configuration = new Configuration({
    apiKey : "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",
});


const openai = new OpenAIApi(configuration);


const runPrompt = async (prompt) => {

    // add role as a message to send to openai
    console.log("prompt: ", prompt);
    

    const response = await openai.createCompletion({
      model: "text-davinci-003",
        prompt: prompt + " in a single line",
        max_tokens: 1000,
        // temperature: 1, // random if > 1
    });

    console.log(response.data);
    console.log(response.data.choices);
    console.log(response.data.choices[0]);

    return response.data.choices[0].text;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function cleanResponse(response) {
  // clean the response from openai
  // return the cleaned response
  // 
  // find the first = sign
  const first = response.indexOf('{');
  console.log('first: ', first)

  // find the first } sign
  const second = response.indexOf('}',  first);
  console.log('second: ', second)

  // find the second } sign
  const third = response.indexOf('}', second + 1);
  console.log('third: ', third)

  // slice the string from the first equals to the sixth backtick
  const cleanedResponse = response.slice(first, third+1);
  console.log('66: ', cleanedResponse)

  // replace the \n with a ''
  const cleanedResponse2 = cleanedResponse.replace(/\\n/g, '');
  console.log('70: ', cleanedResponse2)

  // convert string (dictionary) to object
  const cleanedResponse3 = JSON.parse(cleanedResponse2);
  console.log('74: ', cleanedResponse3)




  // return the object
  return cleanedResponse3;
}


export default async function handler(req, res) {


    if (req.method === 'POST') {
      const body = req.body

      console.log('body: ', body)
      // return res.status(200).json({"check_list": check_list})
  
      // check if checklist_request is empty
      if (req.body === '') {
        console.log('checklist_request is empty: ', req.body)
        return res.status(404).json({"req.body": req.body})
      }


      // make a call to openai

      let final_request = 'Please make a checklist for ' + body.checklist_request + ' with a timeline in the form of a JSON parsable string of the format keys as \{"name":"title", "tasklist": \{"task": time to complete task\}\}.'
      
      
      console.log('final_request: ', final_request);

      
      // const response = await runPrompt(final_request);
      // return res.status(200).json({"body": response})
  
      // console.log('unclean response: ', response)

      // check if response string is of JSON parsable format

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

      // if not, return error



  
      // add to checklist 
      // format is as follows:
  //     export const check_list = [{
  //       "id" : 1,
  //       "name" : "Clean my room",
  //       "tasklist" : {
  //           "Make the bed": 5,
  //           "Pick up all the clothes and put them away": 15,
  //           "Gather all the trash and throw it away": 10,
  //           "Vacuum or sweep the floor": 20,
  //           "Dust surfaces (bookshelves, tables, etc.)": 15,
  //           "Clean mirrors and windows": 10,
  //           "Organize desk and workspace": 20,
  //           "Fold and put away clean laundry": 15,
  //           "Mop the floor": 20
  //       }
    
  //   },
  // ]
      // const cleanedResponse = cleanResponse(response);

      console.log('cleanedResponse: ', cleanedResponse)

      check_list.push({
        "id" : Date.now(),
        "name" : cleanedResponse.name,
        "tasklist" : cleanedResponse.tasklist
      })


      console.log("returning 141 " , {
        "id" : Date.now(),
        "name" : cleanedResponse.name,
        "tasklist" : cleanedResponse.tasklist
      })

      res.status(200).json({ "message": "added", "check_list": check_list})
      // return {"success": true, "message": "Checklist added", "check_list": check_list}

    } 



  // process the GET request
  console.log('checklist', check_list)
  res.status(200).json({ check_list })
  // res.status(200).json({ data: `${body.first} ${body.last}` })
}