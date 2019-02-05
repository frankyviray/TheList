var db = require("../models");
var randtoken = require("rand-token");

module.exports = function(app) {

  app.post("/api/register", function(req, res) {
    //console.log(req.body);
    var token = randtoken.generate(16);

    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      token: token
    }).then(function(response) {
        console.log(response);
        res.json(response);
    }).catch(function(err) {
      console.log(err);
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    });
  })

  app.post("/api/login", function(req,res) {
    //console.log(req.body);
    var token = randtoken.generate(16);
    db.User.update({
      token: token
    }, {
      where: {
        email: req.body.email,
        password: req.body.password
      }
    }).then(function(response) {
      console.log(response);
      res.json(response);
    }).catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.send({
        "code":400,
        "failed":"error ocurred"
      });
    });
  });

  app.get("/api/loginInfo", function(req, res) {
    //console.log(req.query.email);
    db.User.findOne({
      where: {
        email: req.query.email,
        password: req.query.password
      }
    }).then(function(response) {
      console.log(response);
      res.json(response);
    });
  });

  app.post("/", function(req, res) {
    db.User.findOne({
      where: {
        token: req.body.token
      }
    }).then(function(response) {
      res.json(response);
    });
  });
}

