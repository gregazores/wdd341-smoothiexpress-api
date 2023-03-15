//import our connection model
const mongodb = require('../library/connection');
const ObjectId = require('mongodb').ObjectId;
const {smoothieSchema} = require('../library/validationSchema')

async function gettingAll(req, res, next, endpoint) {
  try {
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
  } catch (error) {
      res.status(502).json(error || "Failed to retrieve your data to the database. Please try again later");
  }
}

async function gettingSingle(req, res, next, endpoint) {
  try {
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
  } catch (error) {
    res.status(502).json(error || "Failed to retrieve your data to the database. Please try again later");
  }
}

async function creatingItem(req, res, next, endpoint) {
  try {
    if (!req.body.name || !req.body.image || !req.body.price || !req.body.calories || !req.body.ingredients || !req.body.quantity) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const smoothieEntries = await smoothieSchema.validateAsync(req.body)

    if (smoothieEntries.error) {
      res.status(400).send({ message: smoothieEntries.error });
      return;
    }

    const response = await mongodb.getDb().db().collection(endpoint).insertOne(smoothieEntries);
    if (response.acknowledged) {
        // console.log("inside creatingItem", response)
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);

    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the item.');
    }
    } catch (err) {
      if(error.isJoi ===true) error.status = 422
      res.status(502).json(error || "Failed to insert your data to the database. Please try again later");
  }
}

async function updatingItem(req, res, next, endpoint) {
  try {
    const userId = new ObjectId(req.params.id);
    
    if (!req.body.name || !req.body.image || !req.body.price || !req.body.calories || !req.body.ingredients || !req.body.quantity) {
      res.status(400).send({ message: 'Content can not be empty!' });
      return;
    }

    const smoothieEntries = await smoothieSchema.validateAsync(req.body)

    if (smoothieEntries.error) {
      res.status(400).send({ message: smoothieEntries.error });
      return;
    }

    const response = await mongodb
      .getDb()
      .db()
      .collection(endpoint)
      .replaceOne({ _id: userId }, smoothieEntries);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the item.');
    }
  } catch (error) {
    if(error.isJoi ===true) error.status = 422
    res.status(502).json(error || "Failed to update your data to the database. Please try again later");
  }
}

async function deletingItem(req, res, next, endpoint) {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection(endpoint).deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the item.');
    }
    
  } catch (error) {
    res.status(502).json(error || "Failed to delete your data to the database. Please try again later");
  }
}

module.exports = { 
    gettingAll,
    gettingSingle,
    creatingItem,
    updatingItem,
    deletingItem
};