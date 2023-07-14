const  mongoose= require('mongoose');
const path = require("path");
const express = require('express');
const { log } = require('console');
const app = express();
var timeout = require('connect-timeout')
const PORT = 3000;

// /middleware
mongoose.connect('mongodb://localhost:27017/checkx').then(()=>{
  console.log("connected")
}).catch(()=>{
  console.log("erorrrrr");
})


app.use(express.json());

// Middleware to set the request timeout
app.use((req, res, next) => {
  // Set the desired timeout duration in milliseconds
  const timeoutDuration = 5000; // 5 seconds

  // Set a timeout for the request
  req.setTimeout(timeoutDuration, () => {
    const error = new Error('Request timeout');
    error.status = 408; // Request Timeout HTTP status code
    next(error);
  });

  next();
});


// app.use((req,res,next)=>{
// req.setTimeout(5000)
// res.setTimeout(5000)
// });








// Routes
app.use("/Create conflict from local", require('./Controller/Create'))
app.use("/admin/sec", require('./Controller/second'))





// simulate delay response


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
