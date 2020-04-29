global.fetch = require('node-fetch');

global.navigator = () => null;

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
   UserPoolId: "us-east-1_qImkVDMxr",
   ClientId: "2lsfusvdfpi9j47keg2c16b9cn"
};
const pool_region = "us-east-1";
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

exports.login = function (req, res) {
   console.log(req.body);
   console.log(req.query);
   console.log(req.params);
   var userName = req.body.name;
   var password = req.body.password;
   var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Email: userName,
        Password: password
    });
    var userData = {
        Username: userName,
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
           var accesstoken = result.getAccessToken().getJwtToken();
	   console.log("Success!");
	   console.log(accesstoken);
	   res.status(200);
           res.json(accesstoken);
        },
        onFailure: (function (err) {
	   console.log("Error!");
	   console.log(err);
	   res.status(400);
           res.send(err);
       })
   })
};


