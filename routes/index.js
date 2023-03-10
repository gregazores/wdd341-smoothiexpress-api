const express = require('express');
const router = express.Router();
const balancedFusionsRouter = require('./balancedFusions');
const fruitBlendRouter = require('./fruitBlend');
const superVeggiesRouter = require('./superVeggies');
const smoothieController = require('../controller'); 
// const swaggerRouter = require('./swagger');

router.use('/public', express.static('public'))

router.use('/balanced-fusions', balancedFusionsRouter)
router.use('/fruit-blend', fruitBlendRouter)
router.use('/super-veggies', superVeggiesRouter)
// router.use('/', swaggerRouter);

// router.get('/', smoothieController.rootResponse);

router.get('/', (req, res, next) => {
    res.send('CSE 341 SMOOTHIEXPRESS API')
});

module.exports = router;