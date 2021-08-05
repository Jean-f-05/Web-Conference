const mongoose = require('mongoose');
const { Schema } = mongoose;

const attendeesSchema = new Schema({
    name:  {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    }
     });


module.exports = mongoose.model('Atendee', attendeesSchema);