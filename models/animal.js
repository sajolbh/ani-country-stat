let mongoose = require('mongoose');

let animalSchema = mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    }
})

let Animal = module.exports = mongoose.model('Animal', animalSchema);
