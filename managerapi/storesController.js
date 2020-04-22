'use strict';

const aws = require("aws-sdk");

aws.config.update({
	region: "us-east-1",
	endpoint: "http://dynamodb.us-east-1.amazonaws.com"
});

var doc = new aws.DynamoDB.DocumentClient();
var TABLE_NAME = "Store-odszoccyjndcdcjgwz2spjlkau-rebuild";

exports.getAllStores = function(req, res) {
	console.log("Getting all stores...");
	var params = {
		TableName: TABLE_NAME
	};
	doc.scan(params, (err, data) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(data);
			res.status(200);
			res.json(data.Items);
		}
	});
};

exports.getAStore = function(req, res) {
	console.log("Getting a store info...");
	var params = {
		TableName: TABLE_NAME,
		KeyConditionExpression: "id = :i",
		ExpressionAttributeValues: {
			":i": req.params.storeId
		}
	};
	doc.query(params, function(err, data) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(data);
			res.status(200);
			res.json(data);
		}
	});
};

exports.addAStore = function(req, res) {
	console.log("Adding a store...");
	console.log(req.params);
	console.log(req.query);
	console.log(req.body);
	var ID = Math.random().toString(36).substr(2,9);
	var params = {
		TableName: TABLE_NAME,
		Item: {
			id: ID,
			name: req.body.name,
			address: req.body.address
		}
	};
	doc.put(params, function(err, data) {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(data);
			res.status(200);
			res.json(data.Items);
		}
	});
};

exports.updateAStore = function(req, res) {
};

exports.deleteAStore = function(req, res) {
};
