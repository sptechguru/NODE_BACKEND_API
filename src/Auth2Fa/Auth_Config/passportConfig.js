
const passport = require('passport');
const User = require('../Models/Auth2fa_Models.js');
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await User.findOne({username});
      // console.log('Find user ', user)
      if(!user) return done(null,false,{message:"User not Found"})
      const isMatchPass = await bcrypt.compare(password,user.password); 
      if(isMatchPass) return done(null,user);
      else return done(null, false,{message:"Incoorect Password"})
    } catch (error) {
       return done(error,{message:'User Not Found'})
    }
  }
));


// Serialize user to store in session
passport.serializeUser((user, done) => {
  console.log("We ar in side Serializer user called..........")
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (_id, done) => {
  try {
    console.log("deserialize User user inside Called. .........",_id);
    const user = await User.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});