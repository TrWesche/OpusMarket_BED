// Library Imports
const express = require('express');
const jsonschema = require("jsonschema");

// Helper Functions Imports 
const ExpressError = require("../helpers/expressError");

// Schema Imports
const orderSchemaNew = require("../schemas/order/orderSchemaNew.json");
// const orderSchemaUpdate = require("../schemas/order/orderSchemaUpdate.json");

// Model Imports
const Order = require('../models/order');

// Middleware Imports
const { ensureIsUser } = require("../middleware/auth");


const orderRoutes = new express.Router();

// ╔═══╗╔═══╗╔═══╗╔═══╗╔════╗╔═══╗
// ║╔═╗║║╔═╗║║╔══╝║╔═╗║║╔╗╔╗║║╔══╝
// ║║ ╚╝║╚═╝║║╚══╗║║ ║║╚╝║║╚╝║╚══╗
// ║║ ╔╗║╔╗╔╝║╔══╝║╚═╝║  ║║  ║╔══╝
// ║╚═╝║║║║╚╗║╚══╗║╔═╗║ ╔╝╚╗ ║╚══╗
// ╚═══╝╚╝╚═╝╚═══╝╚╝ ╚╝ ╚══╝ ╚═══╝
orderRoutes.post('/new', ensureIsUser, async(req, res, next) => {
    try {
        const validate = jsonschema.validate(req.body, orderSchemaNew);
        if(!validate.valid) {
            //Collect all the errors in an array and throw
            const listOfErrors = validate.errors.map(e => e.stack);
            throw new ExpressError(`Unable to create a new Order: ${listOfErrors}`, 400);
        }

        const result = await Order.add_order(req.user.id, req.body.order);

        return res.json({"order": result});
    } catch (error) {
        return next(error);
    }
})


// ╔═══╗╔═══╗╔═══╗╔═══╗
// ║╔═╗║║╔══╝║╔═╗║╚╗╔╗║
// ║╚═╝║║╚══╗║║ ║║ ║║║║
// ║╔╗╔╝║╔══╝║╚═╝║ ║║║║
// ║║║╚╗║╚══╗║╔═╗║╔╝╚╝║
// ╚╝╚═╝╚═══╝╚╝ ╚╝╚═══╝ 
orderRoutes.get('/history', ensureIsUser, async(req, res, next) => {
    try {
        const orders = await Order.retrieve_orders_by_user_id(req.user.id);

        return res.json({"orders": orders});
    } catch (error) {
        return next(error);
    }
})

orderRoutes.get('/:order_id', ensureIsUser, async(req, res, next) => {
    try {
        const order = await Order.retrieve_order_by_order_id(+req.params.order_id, req.user.id);

        return res.json({"order": order});
    } catch (error) {
        return next(error);
    }
})


// ╔╗ ╔╗╔═══╗╔═══╗╔═══╗╔════╗╔═══╗
// ║║ ║║║╔═╗║╚╗╔╗║║╔═╗║║╔╗╔╗║║╔══╝
// ║║ ║║║╚═╝║ ║║║║║║ ║║╚╝║║╚╝║╚══╗
// ║║ ║║║╔══╝ ║║║║║╚═╝║  ║║  ║╔══╝
// ║╚═╝║║║   ╔╝╚╝║║╔═╗║ ╔╝╚╗ ║╚══╗
// ╚═══╝╚╝   ╚═══╝╚╝ ╚╝ ╚══╝ ╚═══╝

// orderRoutes.patch('/:order_id/pay', ensureIsUser, async(req, res, next) => {
//     try {
//         const payment_id = 0;

//         await Order.modify_order_record_payment(+req.params.order_id, payment_id);

//         return res.json({ "message": "Payment successful" })
//     } catch (error) {
//         return next(error);
//     }  
// })


// ╔═══╗╔═══╗╔╗   ╔═══╗╔════╗╔═══╗
// ╚╗╔╗║║╔══╝║║   ║╔══╝║╔╗╔╗║║╔══╝
//  ║║║║║╚══╗║║   ║╚══╗╚╝║║╚╝║╚══╗
//  ║║║║║╔══╝║║ ╔╗║╔══╝  ║║  ║╔══╝
// ╔╝╚╝║║╚══╗║╚═╝║║╚══╗ ╔╝╚╗ ║╚══╗
// ╚═══╝╚═══╝╚═══╝╚═══╝ ╚══╝ ╚═══╝

// orderRoutes.delete('/:order_id/delete', ensureIsUser, async(req, res, next) => {
//     try {
//         const result = Order.remove_order(+req.params.order_id);

//         return res.json({"message": "Order deleted"})
//     } catch (error) {
//         return next(error);
//     }
// })

module.exports = orderRoutes;