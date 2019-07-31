
// const credentials = require ('../../Cred');
// const express = require('express');
// const router = express.Router();  
// const bodyParser = require('body-parser')
const {Intent} = require('../../APIDB/sequelize');
// const {Agent} = require('../../APIDB/sequelize');
// var config;
async function createIntent(req,res)
{
  const dialogflow = require('dialogflow');
  text = req.body.displayName;
  // Instantiates the Intent Client
  const intentsClient = new dialogflow.IntentsClient(req.userData.dialogFlowCred);

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.projectAgentPath(req.userData.project_id);

  const intent = {
    displayName:`${text}`
  };

  const createIntentRequest = {
    parent: agentPath,
    intent: intent
  };

  // Create the intent
  const responses = await intentsClient.createIntent(createIntentRequest);
  console.log(`Intent ${responses[0].name} created`);
  
  const response = responses[0].name;
  const seperate = response.split ('/');
  const newOject={"intentId": seperate[4],"projectId":seperate[1],"displayName":req.body.displayName};
  // console.log(newOject);
    Intent.create(newOject)
        .then(response => "") 

const responsetouser = responses[0].name;
let respData = {
    data: responsetouser
  };
  res.send(respData);
 
}  
  
module.exports={
  createIntent : createIntent
}
