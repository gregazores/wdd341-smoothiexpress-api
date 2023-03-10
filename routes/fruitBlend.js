const express = require('express');
const router = express.Router();
const SmoothieController = require('../controller/index');

// router.get('/', () => {
//     smoothieController.Controller.getAll('BalancedFusions')
// });

router.get('/', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.getAll(req, res, next)
});

router.get('/:id', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.getSingle(req, res, next)
});

router.post('/', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.createItem(req, res, next)
});

router.put('/:id', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.updateItem(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    let controller = new SmoothieController('FruitBlend')
    controller.deleteItem(req, res, next)
});


module.exports = router;