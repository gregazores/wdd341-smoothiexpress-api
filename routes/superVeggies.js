const express = require('express');
const router = express.Router();
const SmoothieController = require('../controller/index');

// router.get('/', () => {
//     smoothieController.Controller.getAll('BalancedFusions')
// });

router.get('/', (req, res, next) => {
    let controller = new SmoothieController('SuperVeggies')
    controller.getAll(req, res, next)
});

router.get('/:id', (req, res, next) => {
    let controller = new SmoothieController('SuperVeggies')
    controller.getSingle(req, res, next)
});

router.post('/', (req, res, next) => {
    let controller = new SmoothieController('SuperVeggies')
    controller.createItem(req, res, next)
});

router.put('/:id', (req, res, next) => {
    let controller = new SmoothieController('SuperVeggies')
    controller.updateItem(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    let controller = new SmoothieController('SuperVeggies')
    controller.deleteItem(req, res, next)
});

module.exports = router;