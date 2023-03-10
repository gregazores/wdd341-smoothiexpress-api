//import our connection model
const model = require('../model/main-model');

let Controller = function(endpoint) {
    this.endpoint = endpoint
}

Controller.prototype.getAll = async function(req, res, next) {
    // res.json("success")
    // console.log("Inside Controller", this.endpoint)
    // console.log("Inside Controller res", res)
    await model.gettingAll(req, res, next, this.endpoint)
    // console.log("Inside Controller", this.endpoint)
}

Controller.prototype.getSingle = async function(req, res, next) {
    await model.gettingSingle(req, res, next, this.endpoint)
}

Controller.prototype.createItem = async function (req, res, next) {
    await model.creatingItem(req, res, next, this.endpoint);
}

Controller.prototype.updateItem = async function (req, res, next) {
    await model.updatingItem(req, res, next, this.endpoint);
};

Controller.prototype.deleteItem = async function (req, res, next) {
    await model.deletingItem(req, res, next, this.endpoint);
};


module.exports = Controller
