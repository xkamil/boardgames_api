let express = require('express');
let router = express.Router();
let E = require('../../exceptions');
let Product = require('../models/product');

router.get('/', (req, res, next) => {
    Product.find({}, (err, products) => {
        if (err) return next(err);

        res.json(products);
    });
});

router.get('/:id', (req, res, next) => {
    Product.findOne({_id: req.params.id}, (err, products) => {
        if (err) return next(err);

        res.json(products);
    });
});

router.post('/', (req, res, next) => {
    let newProduct = req.body;
    console.log('Adding new product:', newProduct);

    Product.findOne({name: newProduct.name}, (err, product) => {
        if (err) {
            console.log('Error when reading from db');
            return next(err);
        }
        if (product) {
            console.log('Product with that name already exists');
            return next(new E.ResourceConflict('product ' + product.name + ' already exists'));
        }

        let productObj = new Product(newProduct);

        productObj.save((err, product) => {
            if (err) return next(err);
            res.status(201).json(product)
        });
    });
});

router.delete('/:id', (req, res, next) => {
    Product.remove({_id: req.params.id}, (err) => {
        if (err) return next(err);
        res.json('');
    });
});

module.exports = router;