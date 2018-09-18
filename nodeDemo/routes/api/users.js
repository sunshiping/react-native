const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require('gravatar');
const User = require("../../models/User");

router.get('/test',(req,res) => {
  res.json({msg:'login works'});
});

router.post("/register",(req,res) => {
  // console.log(req.body)
  User.findOne({email:req.body.email})
    .then((user) => {
      if (user) {
        return res.status(400).json({email:"邮箱已被注册"});
      }else{
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new User({
          name:req.body.name,
          email:req.body.email,
          avatar,
          password:req.body.password,
        });
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
              // Store hash in your password DB.
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
          });
      });
      }
    });
});

router.post('/login',(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
  .then(user => {
    if(!user){
      return res.status(404).json({email:"用户不存在"});
    }

    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(isMatch){
        res.json({msg:"success"});
      }else{
        return res.status(400).json({password:"密码错误"})
      }
    });
  });
});



module.exports = router;