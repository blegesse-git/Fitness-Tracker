const logger = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models")

var PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})





app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/index.html"))
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/exercise.html"))
});
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/stats.html"))
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, workouts) => {
        if(err){
            console.log(err)
        }else {
            res.json(workouts)
        }
    })
})

app.post("/api/workouts", ({body}, res) => {
    db.Exercise.create(body)
        .then(({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id }}, { new: true}))
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        });
});
// app.put("/api/workouts/:id", (req, res) => {
//     db.Exercise.create(req.body)
//     .then(data => {
//       return db.Workout.findOneAndUpdate({_id: req.params.id},{$push: data})  
//     })
//     .then(newData => {
//         if(!newData){
//             return res.status(404).json({message: "No Workout Found"})
//         }
//         res.json(newData)
//     })
//     .catch(err => console.log(err))
    
// })

mongoose.connection.once("open", ()=>{
    app.listen(PORT, ()=>{
        console.log("App running on port 3000!")
    })
})
