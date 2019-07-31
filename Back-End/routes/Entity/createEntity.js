
const express = require('express')
const router  = express.Router()
const cors = require('cors')
const credentials = require ('../../Cred');
const {Entity} = require('../../APIDB/sequelize');
const {EntityType} = require('../../APIDB/sequelize');
//runSample is the function to detect intent
async function createEntity(req,res) {
  
const dialogflow = require('dialogflow');
const uuid = require('uuid');
EntityType.findAll ({
  where : {
    
    entityTypeName : req.body.entityTypeName
  },
  raw:true

}).then(async function(results) {
  console.log(results)
entityTypeId = results[0].entityTypeId;
entityValue = req.body.entityValue;
synonyms = req.body.synonyms;
 

// A unique identifier for the given session
const sessionId = uuid.v4();

//include the above in all apis

  // Instantiates clients
  const entityTypesClient = new dialogflow.EntityTypesClient(req.userData.dialogFlowCred);

  // The path to the agent the created entity belongs to.
  const agentPath = entityTypesClient.entityTypePath(req.userData.project_id, entityTypeId);

  const entity = {
    value: entityValue,
    synonyms: synonyms,
  };

  const createEntitiesRequest = {
    parent: agentPath,
    entities: [entity],
  };

  const response = await entityTypesClient.batchCreateEntities(createEntitiesRequest);
  // Create a new session
  console.log('Created entity type:');
    console.log("?>>>>>>>>");
    console.log(response);
    console.log("?>>>>>>>>");
    console.log("My name is",response[0].latestResponse.name);

 
    const responses = response[0].latestResponse.name;
    const seperate = responses.split ('/');
    console.log(responses.split ('/')[3]);
    const newObject = {"entityId": seperate[3],"projectId":seperate[1],"entityTypeId":results[0].entityTypeId,"entityTypeName":responses[0].displayName,"Kind":responses[0].kind};
    Entity.create(newObject);
  })
}  

module.exports = {
  createEntity: createEntity
    };
    