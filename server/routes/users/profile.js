const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const jwt = require("express-jwt");

const { config } = require("../../config");

/** PATCH /api/profile/:userId */
/** Authenticated route */
router.patch("/:userId", jwt(config), async (req, res, next) => {
  // Only allow to fetch current user
  console.log(4)
  console.log(req.body)
  if (req.user.payload.id !== +req.params.userId) {
    return res.status(401).send({ error: "You can can only access yourself" });
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