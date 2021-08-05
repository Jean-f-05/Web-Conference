const mongoose = require("mongoose");
const Speaker = require("../models/speakers");
const superheroes = require('superheroes');
const {jobs} = require("./seedsJobs")

// const {descriptors,places} = require("./seedHelpers")
// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

mongoose.connect('mongodb://localhost:27017/webConference', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected!")
})

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async ()=>{
    await Speaker.deleteMany({});
    for (let i = 0; i < 7; i++){
        const random = Math.floor(Math.random()*15);
        const speaker = new Speaker ({
            name: superheroes.random(),
            job: `${sample(jobs)}`,
            photo: "https://source.unsplash.com/collection/11660705",
            socialNetworks: ["https://facebook.com","https://twitter.com","https://linkedin.com"],
            workDetails: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure et voluptatibus doloribus est praesentium, eligendi, a amet magnam neque consequuntur voluptatum aut nostrum voluptatem dolores mollitia veritatis sunt! Dolor, possimus! "
        })
        await speaker.save();
        
    }
}

seedDB()
.then(()=>{
    mongoose.connection.close();
})