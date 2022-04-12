const express = require("express");
const jwt = require("express-jwt");
const { config } = require("../../config");
const router = express.Router();
const register = require("./log/register");
const login = require("./log/login");
const logout = require("./log/logout");

// const { User } = require('../../models');

// /** GET /api/users/:userId */
// /** Authenticated route */
// router.get("/:userId", jwt(config), async (req, res, next) => {
//     console.log("www",req.user)
//     if (req.user.payload.id !== +req.params.userId) {
//       return res.status(401).send({ error: "You can can only access yourself" });
//     }
//     return User.findByPk(req.params.userId)
//       .then((user) => res.json(user))
//       .catch(next);
//   });

// router.get("/:userId", jwt(config), async (req, res, next) => {
//     // Only allow to fetch current user
//     console.log("userId")
//     if (req.user.payload.id !== +req.params.userId) {
//       return res.status(401).send({ error: "You can can only access yourself" });
//     }
//     return User.findByPk(req.params.userId)
//       .then((user) => {
//         if (!user) {
//           return user;
//         }
  
//         Object.assign(user, req.body);
//         return user.save();
//       })
//       .then((user) => {
//         return user
//           ? res.json(user)
//           : res.status(401).send({
//               error: `User with publicAddress ${req.params.userId} is not found in database`,
//             });
//       })
//       .catch(next);
//   });

// router.get("/", async (req, res, next) => {
//   // If a query string ?publicAddress=... is given, then filter results
//   console.log("1111111",req.query.publicAddress)
//   const whereClause = req.query.publicAddress ? {
//     where: { publicAddress: req.query.publicAddress },
//   }: undefined;
//   console.log("222222",whereClause);
//   return User.findAll(whereClause)
//     .then((users) => {
//         res.json(users)
//         console.log("3333333", users)
//     })
//     .catch(next);
// });

//const { isLoggedIn, isNotLoggedIn } = require("../../middleware/middwares");

/* 사용자 정보 */
router.use("/register", register);


// router.use("/login", isNotLoggedIn, login);
// router.use("/logout", isLoggedIn, logout);



const users = require("./log/users");

router.use("/", users);

module.exports = router;
