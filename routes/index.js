const express = require('express');
const router = express.Router();
const fs = require('fs');
const User = require('../models/user-model')
const Kudo = require('../models/kudo-model')
// const authCheck = (req, res, next) => {
//   if (!req.session.name) {
//     res.redirect('/auth/login');
//   }
//   else {
//     next()
//   }
// }
/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.route('/profile')
  .get( async (req, res) => {
    const members = await User.find()
    const userKudos = await Kudo.find({name:req.session.name})
    const pic = await User.find({username:req.session.name})
    const picture = pic[0].picture
    res.render('profile',{user: req.session.name, members ,picture,userKudos })
  })
  .delete(async function (req, res, next) {
    let text = req.body.text
    await Kudo.findOneAndDelete({ text });
    res.send();
  })
router.route('/kudo')
.get( async function (req, res) {
  const members = await User.find()
  res.render('kudo',{ user: req.session.name,members  });
})
.post(async function (req, res) {
    const newKudo = new Kudo({
      author: req.session.name,
      name: req.body.name,
      text: req.body.text
    })
    await newKudo.save()
    res.json({ url: '/profile',user: req.session.name })
});

router.route('/allkudos')
.get( async function (req, res) {
  const pic = await User.find({username:req.session.name})
  const picture = pic[0].picture
  const allkudos = await Kudo.find()
  const members = await User.find()
  res.render('allkudos',{ user: req.session.name, allkudos, members ,picture  });
})
// .post(async function (req, res) {
//     const newKudo = new Kudo({
//       author: req.session.name,
//       name: req.body.name,
//       text: req.body.text
//     })
//     await newKudo.save()
//     res.json({ url: '/profile',user: req.session.name })
// });

router.route('/reg')
.get(  function (req, res) {
    res.render('reg');
})
.post( async function(req,res){
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
    picture: req.body.picture
})
await newUser.save()
res.json({ url: '/' });
})
module.exports = router;

//access_token=338422391.ffd79ca.62aa7d234afa4b9a9503ff08952eb9f4