// // https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
// const keys = require('./config/keys');
// const User = require('./models/User');
// const cookieSession = require('cookie-session');
// const express = require('express');
// const app = express();
// const router = express.Router();

// passport.use(
//   new GoogleStrategy({
//       clientID: keys.google.clientID,
//       clientSecret: keys.google.clientSecret,
//       callbackURL: '/auth/google/redirect'
//   }, (accessToken, refreshToken, profile, done) => {
//       // passport callback function
//       //check if user already exists in our db with the given profile ID
//       User.findOne({googleId: profile.id})
//       .then((currentUser)=>{
//         if(currentUser){
//           //if we already have a record with the given profile ID
//           done(null, currentUser);
//         } else{
//              //if not, create a new user 
//             new User({
//               googleId: profile.id,
//             }).save().then((newUser) =>{
//               done(null, newUser);
//             });
//          } 
//       })
//     })
// );

// // Implementation Step 1: When user clicks "Log in with Google"
// app.get("/auth/google", passport.authenticate("google", {
//     scope: ["profile", "email"]
//   }));

// // Implementation Step 2: After user clicks "Allow" on the consent screen
// app.get("/auth/google/redirect",passport.authenticate('google'));


// passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });


// passport.deserializeUser((id, done) => {
// 	User.findById(id).then((user) => {
// 		done(null, user);
// 	});
// });


// app.use(cookieSession({
//     // milliseconds of a day
//     maxAge: 24*60*60*1000,
//     keys:[keys.session.cookieKey]
//   }));
  


//   router.get("auth/google/redirect", passport.authenticate("google"),(req,res)=>{
//     res.send(req.user);
//     res.send("you reached the redirect URI");
//   });
  
//   app.get("/auth/logout", (req, res) => {
//     req.logout();
//     res.send(req.user);
//   });


//   app.use(passport.initialize());
//   app.use(passport.session());