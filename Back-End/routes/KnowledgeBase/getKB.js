// const express = require('express')
// const router  = express.Router()
// const credentials = require ('../../Cred');
const {KnowledgeBase} = require('../../APIDB/sequelize');
async function getKnowledgeBase(req,res) {
    // [START dialogflow_get_knowledge_base]
    // Imports the Dialogflow client library
    const dialogflow = require('dialogflow').v2beta1;
    // Instantiate a DialogFlow client.
    const client = new dialogflow.KnowledgeBasesClient( req.userData.dialogFlowCred)

    /**
     * TODO(developer): Uncomment the following lines before running the sample.
     */
    KnowledgeBase.findAll ({
      where : {
        projectId : req.userData.project_id,
        displayName : req.body.displayName
      },
      raw:true

    }).then(async function(results) {

    knowledgeBaseId = results[0].knowledgeBaseId;
    // projectId = results[0].projectId;
    const formattedName = client.knowledgeBasePath(req.userData.project_id, knowledgeBaseId);
  
    const [result] = await client.getKnowledgeBase({name: formattedName});
    console.log(`displayName: ${result.displayName}`);
    console.log(`name: ${result.name}`);
    // [END dialogflow_get_knowledge_base]
  
    const responsetouser = result;
    let respData = {
    data: responsetouser
  };
    res.send(respData);
  
})
}
module.exports = {
    getKnowledgeBase: getKnowledgeBase
};
 
    