const mongoose =require('mongoose')

const toDoSchema = new mongoose.Schema({
    task:{
        type:String,
        required :true
    },
    completed:{ 
      type:Boolean,
      default:false

    },
    priority:{
        type:String,
        required :true
    }
},
{
    timestamps: true
})

const toDoModel=mongoose.model('Todo',toDoSchema)
module.exports = toDoModel