'use strict';

const aws = require("aws-sdk");
var uuid = require("uuid");

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

exports.addAnInventory = function(req, res) {
	var id  = uuid.v4();
	var date = new Date(Date.now());
	var params = {
		TableName: TABLE_NAME,
		Item: {
			id: id,
			name:     req.body.name,
			barcode:  req.body.barcode,
			quantity: req.body.quantity,
			price:    req.body.price,
			updatedAt: date.toISOString(),
			_lastChangedAt: date.getTime(),
			__typename: "Product",
			_version: 1.0,
			productStoreId: req.body.storeId
		}
	};
	doc.put(params, (err, data) => {
		if (err) {
			console.log(err);
			res.send(err);
		} else {
			console.log(data);
			res.status(200);
			res.json({message: "OK", id: id});
		}
	});
};

exports.updateAnInventory = function(req, res) {
	console.log(req.body);
    var params = {
        TableName: TABLE_NAME,
        Key: {
          "id": req.body.id
        },
        UpdateExpression:
          "set #nam=:nam, #barc=:barc, #qty=:qty, #prc=:prc",
        ExpressionAttributeValues: {
          ":nam":          req.body.name,
          ":barc":         req.body.barcode,
          ":qty":          req.body.quantity,
          ":prc":          req.body.price,
        },
	ExpressionAttributeNames: {
		"#nam":       "name",
		"#barc":      "barcode",
		"#qty":       "quantity",
		"#prc":       "price",
	}
      };
      doc.update(params, function(err, data) {
        if (err) {
	  console.log(err);
          res.send(err)
        } else {
          res.status(200);
          res.json(data);
        }
      });
};

exports.deleteAnInventory = function(req, res) {
    var params = {
        TableName: TABLE_NAME,
        Key: {
            id: req.body.id
        }
    };
    doc.delete(params, (err, data) => {
        if(err) {
            res.send(err);
        }
        else {
	    res.status(200);
            res.json(data);
        }
    });
};
