const express = require('express');
const EventController = require('../controller/events');
const asyncWrapper = require('../middleware/wrapper');

const router = express.Router();

// POST /events
router.post('/', asyncWrapper(EventController.createEvent));

module.exports = router;
