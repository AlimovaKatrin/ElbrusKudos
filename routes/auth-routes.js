const router = require('express').Router();
const passport = require('passport');
const express = require('express');
const User = require('../models/user-model')

//auth login//
router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post(async (req, res) => {
        const arr = await User.find();//user by name search 
        for (let i = 0; i < arr.length; i++) {
          if (req.body.username === arr[i].username && req.body.password === arr[i].password) {
            req.session.name = req.body.username;
            console.log('Успешная авторизация');
            // console.log('User is:' + {user: req.session.name} )
            return res.json({ url: '/profile',user: req.session.name })
          }
        }
        res.json({ error: 'Неправильно введены данные' })
      })
      
//auth logout//
router.get('/logout',(req, res) => {
    //handle with passport
    
    req.logOut()
    // try {
    //     req.session.destroy()
    // } catch(e) {
    //     console.log(e)
    // }
    res.redirect('/')
})

//auth with google//
router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))
 
router.get('/google/redirect',passport.authenticate('google'),
    (req, res) => {
        req.session.name = req.session.passport.user.username
        
        res.redirect('/profile')
    });



module.exports = router;
