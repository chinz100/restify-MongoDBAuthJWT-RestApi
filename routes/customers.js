const errors = require('restify-errors');
const Customer = require('../models/Customer');
module.exports = server => {
    server.get('/customers/all', async (req, res, next) => {
        try {
            const customers = await Customer.find({}).sort({ updatedAt: -1 });
            res.send(customers);
            next();
        } catch (err) {
            return next(new errors.InvalidContentError(err));
        }
    });

    //find by id
    server.get('/customers/List', async (req, res, next) => {

        //find email form JWT HEADER
    const findemail = req.user.email;
        try {
            const customer = await Customer.find({ "email" : findemail})
            res.send(customer);
            next();
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`));
        }
    });

    //update customer
    server.put('/customers/:id', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'appication/json'"));
        }
        try {
            const costomer = await Customer.findOneAndUpdate({ _id: req.params.id }, req.body);
            const apishow = await Customer.findById({ _id: req.params.id });
            res.send(apishow);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });

    //delete

    server.del('/customers/:id', async (req, res, next) => {
        try {
            const customer = await Customer.findOneAndRemove({ _id: req.params.id });
            res.send(customer);
            next();
        } catch (err) {
            new errors.ResourceNotFoundError(`There is no customer with the id of ${req.params.id}`)
        }
    });

    // insert customer
    server.post('/customers/insert', async (req, res, next) => {
        if (!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'appication/json'"));
        }
        const {balance } = req.body;
        //console.log(email)
        const customer = new Customer({
            'name': req.user.email,
            'email': req.user.email,
            'balance': balance
        });
         
        try {
            const newCustomer = await customer.save();
            res.send(newCustomer);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }
    });
};