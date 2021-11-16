const router = require("express").router();
// const db = require("./models");

router.get("/exercise", async (req, res) => {
    try{
        res.send("../public/exercise.html")
    } catch (err) {
        res.json(err)
    }
})

router.get("/stats", async (req, res) => {
    try{
        res.send("../public/stats.html")
    } catch (err) {
        res.json(err)
    }
})

router.get("/index", async (req, res) => {
    try{
        res.send("../public/index.html")
    } catch (err) {
        res.json(err)
    }
})


module.exports = router;