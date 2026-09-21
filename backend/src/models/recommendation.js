const mongoose=require('mongoose');
const {Schema}=mongoose;

const recomendSchema=new Schema({
 problemName:{
        type:String,
        required:true
    },
  description:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

const Recomend=mongose.model('recomendation',recomendSchema);
module.exports=Recomend;