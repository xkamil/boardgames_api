let express = require('express');
let router = express.Router();
let E = require('../../exceptions');
let Game = require('../models/game');

router.get('/', (req, res, next) => {
    Game.find({}, (err, games) => {
        if (err) return next(err);
        res.json(games);
    });
});

router.get('/:id', (req, res, next) => {
    Game.findOne({_id: req.params.id}, (err, game) => {
        if (err) return next(err);
        res.json(game);
    });
});

router.post('/', (req, res, next) => {
    let newGame = req.body;

    Game.findOne({name: newGame.name}, (err, game) => {
        if (err) return next(err);

        if (game) {
            return next(new E.ResourceConflict('Game ' + Game.name + ' already exists'));
        }

        let gameObj = new Game(newGame);

        gameObj.save((err, game) => {
            if (err) return next(err);
            res.status(201).json(game);
        })
    });
});

router.delete('/:id', (req, res, next) => {
    Game.remove({_id: req.params.id}, (err) => {
        if (err) return next(err);
        res.json({});
    });
});

module.exports = router;