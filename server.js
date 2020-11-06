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
    
})

app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));



// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/public/index.html"))
// });
// app.get("/exercise", (req, res) => {
//     res.sendFile(path.join(__dirname + "/public/exercise.html"))
// });
// app.get("/stats", (req, res) => {
//     res.sendFile(path.join(__dirname + "/public/stats.html"))
// });

// app.get("/api/workouts", (req, res) => {
//     db.Workout.find({}, (err, workouts) => {
//         if(err){
//             console.log(err)
//         }else {
//             res.json(workouts)
//         }
//     })
// })

// app.post("/api/workouts", (req, res) => {
//     db.Workout.create({})
//         .then(dbWorkout => {
//             res.json(dbWorkout)
//         })
      
// });
// app.put("/api/workouts/:workout", ({body, params}, res) => {
//     db.Workout.findOneAndUpdate({_id: params.id},
//         {$push: {exercises: body}}, 
//         { upsert: true, 
//         useFindAndModify: false},  
    
//         newData => {
       
//         res.json(newData)
//     })
    
    
// })

mongoose.connection.once("open", ()=>{
    app.listen(PORT, ()=>{
        console.log("App running on port 3000!")
    })
})
