const express = require("express");
const Testingmodel = require('../Model/testing_module');

const router = express.Router();





router.get('/find', async (req, res) => {
  try{
//{ grades:{$elemMatch:{"score":{$gt:5}}} }
console.log(Date.parse("2011-03-10T00:00:00.000Z"));
const result = await Testingmodel.aggregate([
  { $unwind: "$grades" },
  {
    $match: {
      "grades.grade": "A"
    }
  },
  {
    $group: {
      _id: {borough: "$borough", restaurant_id: "$restaurant_id"},
      summing: { $sum: 1 }
    }
  }





  // {$limit:5}


]
)

setTimeout(() => {
  res.send(result)

}, 1000);
  }catch(error){
    next(new Error(error))
  }
  


})



router.get('/test-connection-length', function (req, res) {
  res.setTimeout(15000, function () {
    clearInterval(interval);
    console.log('Request has timed out.');
    res.status(500).send('Response Processing Timed Out.');

  });
  console.log('Got request.');
  var now = Date.now();
  interval = setInterval(function () {
    console.log('Still Waiting: ', (Date.now() - now) / 1000);
  }, 1000);
});

module.exports = router;