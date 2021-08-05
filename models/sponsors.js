const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    url: String,
    filename:String
})

imageSchema.virtual('thumb').get(function() {
    return this.url.replace("/upload/", "/upload/c_fill/")
});

const sponsorSchema = new Schema({

    sponsorID:{
        type: String,
        required: true
    },

    image:imageSchema
});



module.exports =  mongoose.model('Sponsor', sponsorSchema)