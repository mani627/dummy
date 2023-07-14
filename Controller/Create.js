const express = require("express");
const Testingmodel = require('../Model/testing_module');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');



let  upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
           
            let paths = `uploads`;
            if (!fs.existsSync(paths)) {
                fs.mkdirSync(paths);
                fs.chmodSync(paths, 0o77)
                callback(null, paths);
            } else {
                callback(null, paths);
            }
        },
        filename: (req, file, callback) => {
            callback(null, `img-${Date.now()}.${file.originalname}`);
        }
    })
});


router.post('/Schema_Create',upload.single("img_file"),async (req, res,next) => {
// console.log(__dirname);
  let buffered=  fs.readFileSync(path.join(__dirname , "..",'/uploads/' , req.file.filename));
  console.log(typeof JSON.parse(req.body.pushing));
let sample_structure={ date: { $date: null }, grade: null, score: null }

let result2=[]
JSON.parse(req.body.pushing).forEach(e=>{
  let loop=  { date: { $date: e[0] }, grade: e[1], score: e[2] }
  result2.push(loop)
})

console.log("oppoo",result2);
  try{
    const result=await Testingmodel.create({
        address: {
           building: req.body.building,
           coord: [ ...req.body.coord ],
           street: req.body.street,
           zipcode: req.body.zipcode
        },
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        grades: [
          ...result2
           
        ],
        name: req.body.name,
        restaurant_id: req.body.restaurant_id,
        image:buffered
      })
      res.send(result)
  }catch(e){
next(e)
  }
    



})


module.exports = router;