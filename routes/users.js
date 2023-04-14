var express = require('express');
var router = express.Router();
var models = require("../models");
const { ensureIsAdmin } = require('../middleware/guards');
const { ensureUserLoggedIn } = require('../middleware/guards');
//const Admin = require('../models/user');

/* GET all admins */
router.get('/admins', async function(req, res, next) {
  try {
    const admins = await models.User.findAll();
    res.send(admins)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

/* PUT admin */
router.put('/admins', ensureIsAdmin, async function(req, res) {
  let { id } = req.body;
  try {
    const user = await models.User.findOne({
      where: {
        id,
      },
    });
    if (user.isAdmin) {
      await user.update({
        isAdmin: false
      });
    } else {
      await user.update({
        isAdmin: true
      });
    }
    res.send(user)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

module.exports = router;
