const express = require("express");
const { createEvent, getUser, getEvents, deleteEvent } = require("../controllers/eventController");

const router = express.Router();

router.get("/", getUser);
router.get("/get-events", getEvents);
router.post("/create-event", createEvent);
router.delete("/delete-event/:googleEventId", deleteEvent);

module.exports = router;
