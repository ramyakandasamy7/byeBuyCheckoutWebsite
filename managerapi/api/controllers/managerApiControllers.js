'use strict';

const aws = require("aws-sdk");

aws.config.update({
	region: "us-east-1",
	endpoint: "http://dynamodb.us-east-1.amazonaws.com"
});

var doc = new aws.DynamoDB.DocumentClient();

exports.get_all_managers = function(req, res) {
	var params = {
		TableName: "bbc_mgmt_users"
	};
	doc.scan(params, (err, data) => {
		if (err) {
			res.send(err);
		} else {
			console.log(data);
			res.status(200);
			res.json(data);
		}
	});
};

exports.get_a_manager = function(req, res) {
	console.log(req.params.id);
	var params = {
		TableName: "bbc_mgmt_users",
		KeyConditionExpression: "id = :i",
		ExpressionAttributeValues: {
			":i": req.params.id
		}
	};
	doc.query(params, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.status(200);
			res.json(data);
		}
	});
};

exports.update_a_manager = function(req, res) {
};

exports.delete_a_manager = function(req, res) {
};
