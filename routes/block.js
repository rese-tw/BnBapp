var express = require('express');
var router = express.Router();
var models = require("../models");
const { ensureIsAdmin } = require('../middleware/guards');
const { ensureUserLoggedIn } = require('../middleware/guards');

/* GET all blockedDates */
router.get('/', async function(req, res, next) {
  try {
    const blocked = await models.BlockedDate.findAll({include: models.Room});
    res.send(blocked)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* GET blockedDates by id*/
router.get('/:id', async function(req, res, next) {
  let { id } = req.params; 
  try {
    const blocked = await models.BlockedDate.findOne({
      where: {
        id,
      },
      include: models.Room
    });
    res.send(blocked)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* POST blocked dates and associate with room  */
router.post('/blockDates/rooms', ensureIsAdmin, async function(req, res) {
    let { rooms, startDate, endDate, comment } = req.body;      
    
    try {
      const blockedDate = await models.BlockedDate.create({
        startDate, 
        endDate, 
        comment
      });
      await blockedDate.addRooms(rooms)

      const updRooms = await models.Room.findAll({ include: models.BlockedDate });
      res.send(updRooms)
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  });


/* PUT rooms by blocked dates id */
router.put('/unblockDates/rooms', ensureIsAdmin, async function(req, res) {
  let { roomId, blockedDatesId } = req.body;
  console.log("******roomId:", roomId, "blockedDatesId:", blockedDatesId)

  try {
    const blockedDate = await models.BlockedDate.findOne({
      where: {
        id: blockedDatesId,
      },
      include: models.Room
    });
    console.log("******blockedDate:", blockedDate.Rooms)

    const Rooms = blockedDate.Rooms.filter( room => +room.id !== +roomId );
    console.log("******Rooms:", Rooms)

    if (Rooms.length === 0) {
      await blockedDate.destroy()
    } else {
      await blockedDate.setRooms(Rooms);
      console.log("******blockedDate after updating rooms:", blockedDate.Rooms)
    }

    // await blockedDate.destroy({
    //   where: Rooms.length === 0
    // })
    
    const updRooms = await models.Room.findAll();
    console.log("******updRooms:", updRooms)
    res.send(updRooms)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* PUT rooms by blocked dates id */
// router.put('/unblockDates/rooms', ensureIsAdmin, async function(req, res) {
//   let { roomId, blockedDatesId } = req.body;

//   try {
//     const blockedDate = await models.BlockedDate.findOne({
//       where: {
//         id: blockedDatesId,
//       },
//       include: models.Room
//     });

//     const id = +roomId;
//     await blockedDate.removeRoom(id);

//     await blockedDate.destroy({
//       where: blockedDate.Rooms.length === 0
//     })
    
//     const updRooms = await models.Room.findAll();
//     res.send(updRooms)
//   } catch (err) {
//     res.status(500).send({ error: err.message })
//   }
// });

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
