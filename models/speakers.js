const mongoose = require('mongoose');
const { Schema } = mongoose;


const thumbSchema = new Schema({
    url:String,
    filename:String
});

thumbSchema.virtual('thumb').get(function(){
    return this.url.replace("/upload/", "/upload/c_thumb,g_face,h_150,w_150/") 
})

thumbSchema.virtual('thumbDetails').get(function(){
    return this.url.replace("/upload/", "/upload/w_250,c_fill,ar_1:1,g_auto,r_max,bo_2px_solid_SkyBlue,b_rgb:ffffff/") 
})

const speakerSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    job:{
        type:String,
    },
    photo:thumbSchema,

    socialNetworks:[{
        twitter:{
            type:String
    },
        facebook:{
            type:String,
    },
        linkedin:{
            type:String,         
    }
    }],
   
    details:{
        type:String,
        required:true
}});

module.exports = mongoose.model('Speaker', speakerSchema);


