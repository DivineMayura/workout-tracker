const router = require("express").Router();
const db = require("../models");



router.get("/api/workouts", async (req, res) => {
    db.Workout.aggregate([
        {
            $addField:
            {
                totalDuration:
                    { $sum: "$exercises.duration" }
            }
        }
    ]).sort({ day: -1 }).limit(1)

        .then(dbBook => {
            res.json(dbBook);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addField:
            {
                totalDuration:
                    { $sum: "$exercises.duration" }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

router.put("/api/workouts/:id", async (req, res) => {
    // This is easier imo with the try and catch
    try {
        const workout = await Workout.findOne({ "_id": new Objectid(req.params.id) });

        savedWorkout = workout.exercises.push(req.body);

        // Might need to change this later.
        workout.save();

        res.status(200).json(workout)
    } catch (err) {
        console.err(err);
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