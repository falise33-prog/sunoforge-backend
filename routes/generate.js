const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    const { prompt } = req.body;
    console.log(`Génération demandée pour : ${prompt}`);

    // Renvoyer immédiatement pour le test
    res.json({
        success: true,
        title: "Synthwave Dreams",
        url: "https://example.com/song.mp3",
        duration: 180,
        style: "Synthwave"
    });
});

module.exports = router;
