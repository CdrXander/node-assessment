var users = require('../users.json');
var idSequence = 201;

module.exports = {
	getUsers:getUsers,
	getUsersBySpec:getUsersBySpec,
	createUser:createUser,
	createUserByRole:createUserByRole,
	updateLanguage:updateLanguage,
	addForum:addForum,
	removeForum:removeForum,
	deleteUser:deleteUser,
	updateUser:updateUser
}

//Util functions

function findAll(parameter, value) {
	var results = []
	for(var i = 0; i < users.length; i++) {
		var userVal = users[i][parameter].toString();
		if(userVal.toLowerCase() === value.toString().toLowerCase()) {
			results.push(users[i]);
		}
	}
	return results;
}

function findIndex(parameter, value) {
	for(var i = 0; i < users.length; i++) {
		if(users[i][parameter] === value) {
			return i;
		}
	}
	return -1;
}

//Public functions
function getUsers(req,res) {
	var results = [];

	if(Object.keys(req.query).length != 0) {
		var parameter = Object.keys(req.query)[0]
		results = findAll(parameter, req.query[parameter]);
	} else {
		results = users;
	}
	res.status(200).send(results);
}

function getUsersBySpec(req,res) {
	if(isNaN(req.params.spec)) {
		var results = findAll("type", req.params.spec);
		res.status(200).send(results);
	} else {
		var results = findAll("id", parseInt(req.params.spec));
		if(results.length > 0) {
			res.status(200).send(results[0]);
		} else {
			res.status(404).send();
		}
	}
}

function createUser(req, res) {
	var newUser = req.body;
	newUser.id = idSequence++;
	newUser.favorites = [req.body.favorites];
	users.push(newUser);
	res.status(200).send(newUser);
}

function createUserByRole(req, res) {
	var newUser = req.body;
	newUser.id = idSequence++;
	newUser.favorites = [req.body.favorites];
	newUser.type = req.params.role;
	users.push(newUser);
	res.status(200).send(newUser);
}

function updateLanguage(req, res) {
	var index = findIndex("id", parseInt(req.params.uid));
	if(index >= 0) {
		users[index].language = req.body.language;
			res.status(200).send(users[index]);
	}
	res.status(404).send();
}

function addForum(req,res) {
	var index = findIndex("id", parseInt(req.params.uid));
	if(index >= 0) {
		users[index].favorites.push(req.body.add);
		res.status(200).send(users[index]);
	}
	res.status(404).send();
}

function removeForum(req, res) {
	var index = findIndex("id", parseInt(req.params.uid));
	if(index >= 0) {
		for(var j = 0; j < users[index].favorites.length; j++) {
			if(users[index].favorites[j] === req.query.favorite) {
				users[index].favorites[j].splice(j,0);
				break;
			}
		}
		res.status(200).send(users[index]);
	} else {
		res.status(404).send();
	}

}

function deleteUser(req,res) {
	var index = findIndex("id", parseInt(req.params.uid));
	if(index >=0) {
		users.splice(index, 1);
		res.status(200).send();	
	} else {
		res.status(404).send();
	}
	
}

function updateUser(req,res) {
	var index = findIndex("id", parseInt(req.params.uid));
	if(index >= 0) {
		for(key in req.body) {
			users[index][key] = req.body[key];
		}
		res.status(200).send(users[index]);	
	} else {
		res.status(404).send();
	}
	
}

