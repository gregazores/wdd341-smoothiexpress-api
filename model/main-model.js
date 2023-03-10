//import our connection model
const mongodb = require('../library/connection');
const ObjectId = require('mongodb').ObjectId;

async function gettingAll(req, res, next, endpoint) {
    // console.log("Inside Model", endpoint)
    const result = await mongodb.getDb().db().collection(endpoint).find();
    // console.log("inside gettingAll",res)
    result.toArray().then((lists) => {
        // console.log("list", lists)
        //There are a few types of HTTP request body types. 
        //For an example, application/x-www-form-urlencoded is the default body type for forms
        //whereas application/json is something we'd use when requesting a resource using jQuery or backend REST client.
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
}

async function gettingSingle(req, res, next, endpoint) {
    const userId = new ObjectId(req.params.id);
    const result =  await mongodb
      .getDb()
      .db()
      .collection(endpoint)
      .find({ _id: userId });

    result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    });
}

async function creatingItem(req, res, next, endpoint) {
    const smoothie = {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        calories: req.body.calories,
        ingredients: req.body.ingredients,
      };
    //   console.log("inside creatingItem endpoint", endpoint)
    const response = await mongodb.getDb().db().collection(endpoint).insertOne(smoothie);
    if (response.acknowledged) {
        // console.log("inside creatingItem", response)
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the item.');
    }
}

async function updatingItem(req, res, next, endpoint) {
    const userId = new ObjectId(req.params.id);
    //updateOne will only let you update specific fields
    const smoothie = {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        calories: req.body.calories,
        ingredients: req.body.ingredients,
      };
    const response = await mongodb
      .getDb()
      .db()
      .collection(endpoint)
      .replaceOne({ _id: userId }, smoothie);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the item.');
    }
}

async function deletingItem(req, res, next, endpoint) {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection(endpoint).deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the item.');
    }
}

module.exports = { 
    gettingAll,
    gettingSingle,
    creatingItem,
    updatingItem,
    deletingItem
};