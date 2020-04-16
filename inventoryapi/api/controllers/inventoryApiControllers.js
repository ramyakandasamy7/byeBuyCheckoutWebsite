'use strict';

const aws = require("aws-sdk");

aws.config.update({
	region: "us-east-1",
	endpoint: "http://dynamodb.us-east-1.amazonaws.com"
});

var doc = new aws.DynamoDB.DocumentClient();

var TABLE_NAME = "Product-odszoccyjndcdcjgwz2spjlkau-rebuild";

exports.get_all_inventory = function(req, res) {
	var params = {
		TableName: TABLE_NAME
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

exports.get_an_inventory = function(req, res) {
	var params = {
		TableName: TABLE_NAME,
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

exports.get_all_inventory_from_store = function(req, res) {
	var params = {
		TableName: TABLE_NAME,
		IndexName: 'gsi-StoreProducts',
		KeyConditionExpression: "productStoreId = :storeId",
		ExpressionAttributeValues: {
			":storeId":req.params.storeId
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

//exports.authenticate_a_manager = function(req, res) {
//	var params = {
//		TableName: "bbc_mgmt_users",
//		IndexName: 'email-index',
//		KeyConditionExpression: "email = :e",
//		ExpressionAttributeValues: {
//			":e": req.body.email
//		}
//	};
//	doc.query(params, function(err, data) {
//		if (err) {
//			res.send(err);
//		} else {
//			console.log(data);
//			res.status(200);
//			res.json(data.Items[0]);
//		}
//	});
//};

exports.update_an_inventory = function(req, res) {
};

exports.delete_an_inventory = function(req, res) {
};
