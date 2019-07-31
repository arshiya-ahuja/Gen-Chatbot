const dialogflow = require('dialogflow').v2beta1;
const {Agent} = require('../../APIDB/sequelize');
const googleapi = require('googleapis');
async function trainAgent(req,res) {
  Agent.findAll ({
    where : {
      
      projectId : req.userData.project_id
    },
    raw:true

  }).then(async function(results) {
const agentClient = new dialogflow.AgentsClient(req.userData.dialogFlowCred);
const projectPath = agentClient.projectPath(req.userData.project_id);
const agent = {   
    displayName: results[0].displayName,
    languageCode : 'en-US',   
};
const trainAgentRequest = {
    parent: projectPath,
    agent : agent
    };
    
const responses = await agentClient.trainAgent(trainAgentRequest);
console.log(responses);

const responsetouser = responses;
  let respData = {
    data: responsetouser
  };
  res.send(respData);
})
}
module.exports = {
  trainAgent : trainAgent
 }
