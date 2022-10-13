var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { User } = require("../models");
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.findAll();
  console.log(users);
  res.send(users);
});
//get add new user.
router.get("/register", (req, res, next) => {
  res.render("Register", {title: "Register"});
});
//post add new user
router.post("/add", async (req, res, next) => {
  let { userName,  firstName, lastName,password, email} = req.body;
  console.log("New user form : ", userName,  firstName, lastName,password, email );
  
  //check to see if username is already taken.
  const aUser = await User.findAll({
    where: {
      userName: userName
    }
  })
  //if username is taken, send error,
  if (aUser.length === 0 ){
    // hash the password first
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      password = hash;
      console.log(password);
      const newUser = await User.create({
        userName, 
        firstName, 
        lastName, 
        password, 
        email
      });
      res.redirect(301, "/users/login");
    });
  } else{
    res.send("the username is already in use")
  }

});
//get login
router.get("/login", (req, res, next) => {
  console.log("login form submitted", req.body)
  res.render("login", {
    title: "login page"
  })
})
//post login
router.post("/login",async (req, res, next) => {
  const {userName, password} = req.body;
  let aUser = await User.findAll({
    where: {
      userName: userName
    }
  });
  aUser = aUser[0];
  console.log("User found ", aUser.password);

  bcrypt.compare(password, aUser.password, function(err, result) {
    if(err){
      res.send(err);
    }else{
      if(result === true){
        
        res.redirect(301, `/users/${userName}`)
      }else{
        res.render("login", {title: "Login"})
      }
    }
  })


  //get the username and password from req.body
  //query the db for the user
  //if there is not a user show error
  //else compare password to user's hash
  //if password doesn't match, throw error
  //else, send message is logged in

});
//Get user by username.

router.get('/:username', async (req, res, next) => {
  const username = req.params.username;
  //query my db by username
  // if user found show single user
  // else if error show error
  const aUser = await User.findAll({
    where: {
      userName: username
    }
  });
  console.log(aUser);
  if (aUser.length === 0){
    res.send("User not found")
  }else{
    res.render("profile", {title: "Profile", aUser: aUser[0]});
  }
});


module.exports = router;
