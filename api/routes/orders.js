const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

//const Order = require('../modules/order')
//const Product = require('../modules/product')

const OrdersController =  require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_getAll);
/*
router.post('/', (req, res, next) => {

    const order = new Order({
        _id: mongoose.Types.ObjectId(), //automatically generate id
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Order stored',
                createdOrder: {
                    _id:result._id,
                    product: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders/' + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});
*/
router.post('/', checkAuth, OrdersController.orders_createOrder);

router.get('/:orderId', checkAuth, OrdersController.orders_getOrder);

router.delete('/:orderId', checkAuth, OrdersController.orders_deleteOrder);

module.exports = router;