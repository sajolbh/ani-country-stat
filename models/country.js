let mongoose = require('mongoose');

let countrySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    animals:{
        type: Array,
        ref: 'Animal'

    }
})

let Country = module.exports = mongoose.model('Country', countrySchema);
