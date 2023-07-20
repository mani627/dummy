const  mongoose= require('mongoose');
const path = require("path");
const express = require('express');
const { log } = require('console');
const app = express();
var timeout = require('connect-timeout')
const PORT = 3000;
const passport=require('passport');
const FacebookStrategy= require('passport-facebook').Strategy;
const Testingmodel = require('./Model/testing_module');


console.log("first");




// /middleware
mongoose.connect('mongodb://localhost:27017/checkx').then(()=>{
  console.log("connected")
}).catch(()=>{
  console.log("erorrrrr");
})


app.use(express.json());

// Middleware to set the request timeout
// app.use((req, res, next) => {
//   // Set the desired timeout duration in milliseconds
//   const timeoutDuration = 5000; // 5 seconds

//   // Set a timeout for the request
//   req.setTimeout(timeoutDuration, () => {
//     const error = new Error('Request timeout');
//     error.status = 408; // Request Timeout HTTP status code
//     next(error);
//   });

//   next();
// });


// app.use((req,res,next)=>{
// req.setTimeout(5000)
// res.setTimeout(5000)
// });






 
app.set('views', __dirname);
 
app.get('/getting', (req, res) => {
  res.redirect('/user');;
})
 


//Oauth
passport.use(new FacebookStrategy({
  clientID: '1476668956428466',
  clientSecret: 'd3310d93ad382e5b5fe78d4dc4a5c42a',
  callbackURL: "http://localhost:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, cb) {
  return done(null, profile);
}
));


// Routes
app.use("/Create", require('./Controller/Create'))
app.use("/admin/sec", require('./Controller/second'))




app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.send('sucess');
  });



// simulate delay response


app.use("*",(req,res)=>{
res.send("402 not found")
})


// Error handler
app.use((err, req, res, next) => {
console.log("logout error",err);

if (req.timedout) {
  // Handle the timeout error
  res.status(408).send('Request timeout');
} else{
  res.status(err.status || 500);
  res.send({
      error: {
          success: false,
          status: err.status || 500,
          message: err.message
      }
  })
}
  
})

app.listen(PORT, (error) =>{
    if(error){
console.log("error occured");
    }
}
)
