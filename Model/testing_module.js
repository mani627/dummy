const  mongoose= require('mongoose');

const subschema= new mongoose.Schema({
   date: { $date: Number }, grade: String, score: Number
})

const userschema= new mongoose.Schema({
    address: {
       building: {
        type:Number,
        required:true
       },
       coord: [ Number ],
       street: String,
       zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [
      subschema 
    ],
    name: String,
    restaurant_id: String,
    image:Buffer
  })


//   userschema.methods.jj=function(){
//    console.log(this)
//   }

    const Multiplemodel= mongoose.model("Demo",userschema);

    module.exports=Multiplemodel