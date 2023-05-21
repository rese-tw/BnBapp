var express = require('express');
var router = express.Router();
var models = require("../models");
const { ensureIsAdmin } = require('../middleware/guards');
const { ensureUserLoggedIn } = require('../middleware/guards');

/* GET all images */
router.get('/', async function(req, res, next) {
  try {
    const images = await models.Image.findAll();
    res.send(images)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* POST new images associated to a room */
router.post('/addimage', ensureIsAdmin, async function(req, res, next) {
    let { name, path, RoomId } = req.body;
    
    try {
        const image = await models.Image.create({
            name, 
            path, 
            RoomId
        });
        res.send(image)
      } catch (err) {
        res.status(500).send({ error: err.message })
      }
    });

module.exports = router;