const dialogflow = require('dialogflow').v2beta1;
const {Agent} = require('../../APIDB/sequelize');
const googleapi = require('googleapis');
async function getAgent(req,res) {

const agentClient = new dialogflow.AgentsClient(req.userData.dialogFlowCred);
const projectPath = agentClient.projectPath(req.userData.project_id);
const getAgentRequest = {
    parent: projectPath
    };
    
const responses = await agentClient.getAgent(getAgentRequest);
console.log(responses);

const responsetouser = responses;
  let respData = {
    data: responsetouser
  };
  res.send(respData);

}
module.exports = {
 getAgent : getAgent 
 }


