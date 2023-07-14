const express = require("express");
const Testingmodel = require('../Model/testing_module');

const router = express.Router();





router.get('/find', async (req, res) => {
//{ grades:{$elemMatch:{"score":{$gt:5}}} }

const result= await Testingmodel.find({ $and:[{"grades.score":2},{"grades.score":6},{borough:"Manhattan"}]  })


setTimeout(() => {
    res.send(result)

}, 15000);


})



router.get('/test-connection-length', function (req, res) {
    res.setTimeout(15000, function(){
        clearInterval(interval);
        console.log('Request has timed out.');
        res.status(500).send('Response Processing Timed Out.');
        
    });
    console.log('Got request.');
    var now = Date.now();
    interval = setInterval(function(){
        console.log('Still Waiting: ', (Date.now() - now) / 1000);
    }, 1000);
});

module.exports = router;