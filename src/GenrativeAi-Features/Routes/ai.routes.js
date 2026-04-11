const express = require("express");
const router = express.Router();

const {
  chatBotController,
  googleAIController,
} = require("../controllers/ai.controller");

// All Ai Routes Declared hear

router.post("/ai-chatBoat", chatBotController);
router.post("/google-api", googleAIController);


module.exports = router;