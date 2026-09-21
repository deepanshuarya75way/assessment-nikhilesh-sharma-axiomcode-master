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

const Recomend=mongoose.model('recomendation',recomendSchema);
module.exports=Recomend;