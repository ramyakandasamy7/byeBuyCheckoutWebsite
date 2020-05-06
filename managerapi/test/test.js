var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../managerapi");
let should = chai.should();
chai.use(chaiHttp);

//MANAGER API TEST
describe("GET ALL MANAGERS", function() {
    it("should retrieve all managers", done=> {
        chai.request("http://localhost:3000")
        .get("/managers")
        .send({})
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});

describe(" AUTHENTICATE ONE MANAGERS", function() {
    it("should authenticate the specified managers", done=> {
        chai.request("http://localhost:3000")
        .post("/managers")
        .send({"email":"jed.villanueva86@gmail.com"})
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});

//INVENTORY API TEST
var global_id = 0;
describe("GET ALL INVENTORIES", function() {
    it("should retrieve all inventory items", done=> {
        chai.request("http://localhost:3000")
        .get("/inventories")
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});


describe("ADD INVENTORY ITEM", function() {
    it("should add an item to inventory", done=> {
        chai.request("http://localhost:3000")
        .post("/inventories")
        .send({"name":"testproduct", "barcode": "12345678", "quantity": "100", "price": "10.50", "storeId": "dd2b3005-6dad-4417-938e-02e8ab4bbe01"})
        .end((err,res)=> {
            global_id = res.body.id;
            res.should.have.status(200);
            done();
        })
    })
});

describe("GET ALL INVENTORIES OF SPECIFIED STORE", function() {
    it("should retrieve all inventory items in store", done=> {
        chai.request("http://localhost:3000")
        .get("/inventories/dd2b3005-6dad-4417-938e-02e8ab4bbe01")
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});

describe("GET SPECIFIED ITEM", function() {
    it("should retrieve specified inventory item", done=> {
        chai.request("http://localhost:3000")
        .get("/inventory/" + global_id)
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});

describe("UPDATE INVENTORY ITEM", function() {
    it("should update item in inventory", done=> {
        chai.request("http://localhost:3000")
        .put("/inventories")
        .send({"id": global_id, "name":"testproduct1", "barcode": "12345679", "quantity": "50", "price": "1.50"})
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});

describe("DELETE ONE INVENTORY ITEM", function() {
    it("should delete an item from inventory", done=> {
        chai.request("http://localhost:3000")
        .delete("/inventories")
        .send({"id":global_id})
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});



//STORE API TEST
var global_id = 0;
describe("GET ALL STORES", function() {
    it("should retrieve all stores", done=> {
        chai.request("http://localhost:3000")
        .get("/stores")
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});

describe("ADD STORE", function() {
    it("should create a new store", done=> {
        chai.request("http://localhost:3000")
        .post("/stores")
        .send({"name":"teststore", "address":"fakeaddress" })
        .end((err,res)=> {
            global_id = res.body.id;
            res.should.have.status(200);
            done();
        })
    })
});

describe("GET SPECIFIED store", function() {
    it("should retrieve specified store information", done=> {
        chai.request("http://localhost:3000")
        .get("/store/" + global_id)
        .end((err,res)=> {
            res.should.have.status(200);
            done();
        })
    })
});



