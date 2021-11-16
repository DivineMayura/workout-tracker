const router = require("express").Router();
const db = require("../models");



router.get("/api/workouts", async (req, res) => {
    // testing out try & catch instead of promises
    try {
        const workout = await Workout.aggregate([
            {
                $addField:
                {
                    totalDuration:
                        { $sum: "$exercises.duration" }
                }
            }
        ]).sort({ day: -1 }).limit(1)

        res.status(200).json(workout)
    } catch (err) {
        console.err(err);
        res.status(500).json({ response: "error retrieving workouts" });
    }
});

router.get("/api/workouts/range", (req, res) => {

    // This is just an easy way to do this, we have lots of examples of this..
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

router.put("/workouts/:id", async (req, res) => {


    // This is easier imo with the try and catch
    try {
        const workout = await Workout.findOne({ "_id": new Objectid(req.params.id) });

        workout.exercises.push(req.body);

        // Might need to change this later.
        workout.save();

        res.status(200).json(workout)
    } catch (err) {
        console.err(err);
        res.status(500).json({ response: "error retrieving workout" });
    }
})

router.post("/workouts", async (req, res) => {

    // This is basically the put route, but made post instead
    try {
        const workout = await Workout.findOne({ "_id": new Objectid(req.params.id) });

        workout.exercises.push(req.body);

        // Might need to change this later.
        workout.save();

        res.status(200).json(workout)
    } catch (err) {
        console.err(err);
        res.status(500).json({ response: "error retrieving workout" });
    }
})







module.exports = router;