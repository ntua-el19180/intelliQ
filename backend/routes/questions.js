const express = require('express');
const router = express.Router();
const questions = require('../services/questions');

/* GET questions. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await questions.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting questions `, err.message);
    next(err);
  }
});



module.exports = router;