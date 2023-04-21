var express = require('express');
var router = express.Router();
var models = require("../models");
const { ensureIsAdmin } = require('../middleware/guards');
const { ensureUserLoggedIn } = require('../middleware/guards');

/* GET all rooms with blocked dates*/
router.get('/', async function(req, res, next) {
  try {
    const rooms = await models.Room.findAll({ include: models.BlockedDate });
    res.send(rooms)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* GET room by :id with blocked dates*/
router.get('/:id', async function(req, res, next) {
    let { id } = req.params;
    try {
      const room = await models.Room.findOne({
        where: {
          id,
        },
        include: models.BlockedDate
    }
    );
      res.send(room)
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  });


/* POST new room */
router.post('/addroom', ensureIsAdmin, async function(req, res, next) {
    let { roomTitle, dailyRate, description } = req.body;
    
    try {
        const room = await models.Room.create({
          roomTitle, 
          dailyRate, 
          description
        });
        res.send(room)
      } catch (err) {
        res.status(500).send({ error: err.message })
      }
    });

/* PUT room by :id */
    router.put('/:id', ensureIsAdmin, async function(req, res) {
        let { id } = req.params;
        let { roomTitle, dailyRate, description } = req.body;

        try {
          const room = await models.Room.findOne({
            where: {
              id,
            },
          });
          await room.update({
            roomTitle, 
            dailyRate, 
            description
          });
          res.send(room)
        } catch (err) {
          res.status(500).send({ error: err.message })
        }
      });

router.delete('/delete', ensureIsAdmin, async function(req, res) {
    let { id } = req.body;
        
    try {
        const room = await models.Room.findOne({
            where: {
                id,
            },
        });
        await room.destroy();
        const rooms = await models.Room.findAll()
        res.send(rooms)
    } catch (err) {
        res.status(500).send({ error: err.message })
    }
});


module.exports = router;
