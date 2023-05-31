import React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";


const { Configuration, OpenAIApi } = require("openai");


// importing the openai api
//const DynamicComp = dynamic(() => import(('openai-api')('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')));

// const DynamicComp = dynamic(() => import('./openai_call'));





const configuration = new Configuration({
    apiKey : "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",
});


const openai = new OpenAIApi(configuration);


const runPrompt = async (prompt) => {

    // add role as a message to send to openai
    
    
    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        max_tokens: 1000,
        temperature: 1, // random if > 1
    });


    console.log(response.data);

    return response.data;
}


export default runPrompt;