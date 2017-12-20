let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let GameSchema = new Schema(
    {
        name: String,
        playing_time: Number,
        complexity: Number,
        players_min: Number,
        players_max: Number,
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Game', GameSchema);