const { router } = require("express");
const db = require("./../models");


router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([{ $range: [0, "date", 100]}, { $addField: { totalWeight: { $sum: "weight" }}} ])
    //   .then(({_id}) => db.Workout.findAndUpdate({}, { $addField: { totalWeight: { $sum: "weight" } } }, { new: true }))
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });





  

  module.exports = router;