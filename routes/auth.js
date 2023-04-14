const express = require('express');
const router = express.Router();
var models = require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config/config');

/* POST/register new user. */
router.post('/register', async function(req, res, next) {
    let { username, password } = req.body;
    password = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    
    try {
        const admin = await models.User.create({
          username,
          password,
          isAdmin: false
        });
        res.send(admin)
      } catch (err) {
        res.status(500).send({ error: err.message })
      }
    });
  
  /* POST/login existing user. */
  router.post('/login', async function(req, res, next) {
    const { username, password } = req.body;
    console.log('hello from the back-end')
    try {
      let user = await models.User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        res.status(401).send({ error: "Login unsuccessful." });
      } else {
        let passwordsEqual = await bcrypt.compare(password, user.password);
        if (passwordsEqual) {
          let payload = {userId: user.id};
          let token = jwt.sign(payload, SECRET_KEY);
          delete user.password;
          res.send ({
            message: "Login successful.",
            token: token,
            user: user
          })
        } else {
          res.status(401).send({ error: "Login failed." });
        }
      }
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;