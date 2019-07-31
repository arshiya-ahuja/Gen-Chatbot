const {Agent} = require('./APIDB/sequelize')
const jwt_Decode = require('jwt-decode');
function userData(req, res, next) {

    const decoded = jwt_Decode(req.token);
    const projectId = decoded.project_id;
    Agent.findAll({
      where: {
        projectId: projectId
      },
      raw: true
  
    }).then(async function (results,err) {
      req.userData = {
        project_id: projectId,
        dialogFlowCred : {
          credentials: {
            private_key: results[0].private_key,
            client_email: results[0].client_email
          }
        }
      }
      if(err)
      {
        res.status(400).send('Please check projectId');
      }
      else{
      next()
      }
    });
  }

  module.exports = {
      userData : userData
  }
