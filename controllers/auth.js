var express = require("express"),
    User = require("../models/user"),
    config = require("../config.js"),
    jwt = require("jwt-simple");

exports.login = function (req, res) {
  passport.authenticate('local', function (err, user, info) { 
    if (err) {
      res.json({success: false, message: err})
    } else {
     if (!user) {
       res.json({success: false, message: 'username or password incorrect'})
     } else {
       req.login(user, function(err) {
         if (err) {
           res.json({success: false, message: err})
         } else {
            let payload = {
              id: user.id,
              expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
            };
            let token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token,
              username: user.username
            });
         }
       })
     }
    }
 })(req, res);
};

exports.register = function (req, res) {
  User.register(
    new User({ username : req.body.username }), 
    req.body.password,
    function (err, user) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};