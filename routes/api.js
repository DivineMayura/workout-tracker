const router = require("express").Router();
const db = require("../models");
const Workout = require("../models/workouts");
const mongoose = require("mongoose");



router.get("/api/workouts", (req, res) => {

    db.Workout.aggregate([
        {
            $addFields:
            {
                totalDuration:
                    { $sum: "$exercises.duration" }
            }
        }
    ])
    .sort({ day: -1 })
    .limit(1)

    .then(dbWorkout => {

        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
        console.log(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields:
            {
                totalDuration:
                    { $sum: "$exercises.duration" }
            }
        }
    ])
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", async (req, res) => {
    // This is easier imo with the try and catch
    try {
        const workout = await Workout.findOne({ "_id": new mongoose.Types.ObjectId(req.params.id) });

        savedWorkout = workout.exercises.push(req.body);

        // Might need to change this later.
        workout.save();

        res.status(200).json(workout)
    } catch (err) {
        res.status(500).json({ response: "error retrieving workout" });
    }
})

router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})




module.exports = router;