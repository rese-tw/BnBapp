var express = require('express');
var router = express.Router();
var models = require("../models");
const { ensureIsAdmin } = require('../middleware/guards');
const { ensureUserLoggedIn } = require('../middleware/guards');

/* GET all blockedDates */
router.get('/', async function(req, res, next) {
  try {
    const blocked = await models.BlockedDate.findAll();
    res.send(blocked)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* POST blocked dates */
router.post('/blockDates', ensureIsAdmin, async function(req, res, next) {
    let { startDate, endDate, comment } = req.body;
    
    try {
        const blockedDates = await models.BlockedDate.create({
          startDate, 
          endDate, 
          comment
        });
        res.send(blockedDates)
      } catch (err) {
        res.status(500).send({ error: err.message })
      }
    });

/* PUT blocked date by id */
router.put('/blockDates', ensureIsAdmin, async function(req, res) {
        let { id, startDate, endDate, comment } = req.body;

        try {
          const blockedDate = await models.BlockedDate.findOne({
            where: {
              id,
            },
          });
          await blockedDate.update({
            startDate, 
            endDate, 
            comment
          });
          res.send(blockedDate)
        } catch (err) {
          res.status(500).send({ error: err.message })
        }
      });

/* DELETE blocked date by id */
router.delete('/delete', ensureIsAdmin, async function(req, res) {
    let { id } = req.body;
    
    try {
          const blockedDate = await models.BlockedDate.findOne({
            where: {
              id,
            },
          });
          await blockedDate.destroy();
          const blocked = await models.BlockedDate.findAll()
          res.send(blocked)
        } catch (err) {
          res.status(500).send({ error: err.message })
        }
      });


module.exports = router;
