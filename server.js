//Node modules import
var express 	= require('express');
var bodyParser	= require('body-parser');

//Configuration
var port = 3000;

//Initialize the app
var app = module.exports = express()
app.use(bodyParser.json());


//Local file imports
var userNode = require('./node_controllers/userNode.js')

//Endpoints

app.get('/api/users', userNode.getUsers);
app.get('/api/users/:spec', userNode.getUsersBySpec);

app.post('/api/users', userNode.createUser);
app.post('/api/users/:role', userNode.createUserByRole);
app.post('/api/users/language/:uid', userNode.updateLanguage);
app.post('/api/users/forums/:uid', userNode.addForum);

app.delete('/api/users/forums/:uid', userNode.removeForum);
app.delete('/api/users/:uid', userNode.deleteUser)

app.put('/api/users/:uid', userNode.updateUser);


//SPIN UP THE DRIVES!!
app.listen(port, function() {
  console.log("Started server on port", port, (new Date()).toTimeString());
});