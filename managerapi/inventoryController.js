'use strict';

const aws = require("aws-sdk");

aws.config.update({
	region: "us-east-1",
	endpoint: "http://dynamodb.us-east-1.amazonaws.com"
});

var doc = new aws.DynamoDB.DocumentClient();
var TABLE_NAME = "Product-odszoccyjndcdcjgwz2spjlkau-rebuild";

exports.getAllInventories = function(req, res) {
	console.log("Getting all items...");
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
			res.json(data);
		}
	});
};

exports.getAnInventory = function(req, res) {
	console.log("Getting an inventory item...");
	var params = {
		TableName: TABLE_NAME,
		KeyConditionExpression: "id = :i",
		ExpressionAttributeValues: {
			":i": req.params.id
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

exports.getAllInventoryFromStore = function(req, res) {
	console.log("Getting all inventory from store...");
	console.log(req.params);
	console.log(req.query);
	console.log(req.body);
	var params = {
		TableName: TABLE_NAME,
		IndexName: "gsi-StoreProducts",
		KeyConditionExpression: "productStoreId = :storeId",
		ExpressionAttributeValues: {
			":storeId": req.params.storeId
		}
	};
	doc.query(params, function(err, data) {
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

exports.updateAManager = function(req, res) {
};

exports.deleteAManager = function(req, res) {
};
