const express = require("express");
const router = express.Router();
const { User } = require("../../../models");
const jwt = require('express-jwt');

const { config } = require('../../../config');


/** GET /api/users */
router.get("/", async (req, res, next) => {
  // If a query string ?publicAddress=... is given, then filter results

  const whereClause =
    req.query && req.query.publicAddress
      ? {
        where: { publicAddress: req.query.publicAddress },
      }
      : undefined;
  return User.findAll(whereClause)
    .then((users) => res.json(users))
    .catch(next);

});

/** GET /api/users/:userId */
/** Authenticated route */
router.get("/:userId", jwt(config), async (req, res, next) => {
  if (req.user.payload.id !== +req.params.userId) {

    return res
      .status(401)
      .send({ error: 'You can can only access yourself' });
  }
  return User.findByPk(req.params.userId)
    .then((user) => res.json(user))
    .catch(next);
});

/** POST /api/users */
router.post("/", async (req, res, next) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch(next);
});

/** PATCH /api/users/:userId */
/** Authenticated route */
router.patch("/:userId", jwt(config), async (req, res, next) => {
  // Only allow to fetch current user
  if (req.user.payload.id !== +req.params.userId) {
    return res
      .status(401)
      .send({ error: 'You can can only access yourself' });
  }
  return User.findByPk(req.params.userId)
    .then((user) => {
      if (!user) {
        return user;
      }

      Object.assign(user, req.body);
      return user.save();
    })
    .then((user) => {
      return user
        ? res.json(user)
        : res.status(401).send({
          error: `User with publicAddress ${req.params.userId} is not found in database`,
        });
    })
    .catch(next);
});

module.exports = router;
