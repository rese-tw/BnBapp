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

/* POST new admin */
router.post('/admins', ensureIsAdmin,  async function(req, res) {
  let { username, password, isAdmin } = req.body;
  try {
    const admin = await models.User.create({
      username,
      password,
      isAdmin
    });
    res.send(admin)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
});

module.exports = router;
