const express = require('express')
const TODO = require('../model/toDo')

const router =express.Router()

router.get('/getList',(req,res)=>{

    TODO.find({})
    .sort('-createdAt')
    .then((data)=>{
        return res.status(201).json({message:'success',data})
    })
    .catch((err)=>{
        return res.status(422).json({error:'something went wrong',err})
    })

})

router.post('/addToDo',(req,res)=>{
    const {task,priority}=req.body

    if(!task && !priority){
        return res.status(422).json({error:'Please fill all the fields'})
    }else{
        TODO.findOne({task:task})
        .then((data)=>{
            if(data){
                return res.status(422).json({error: 'Task already exists'})
            }else{
                const todo =new TODO({
                    task:task,
                    priority:priority
                })
            
                todo.save()
                .then((data)=>{
                    return res.status(201).json({message:'Task added sucessfully'})
                })
                .catch((err)=>{
                    return res.status(422).json({error:'Something went wrong'})
                })
            }
        })
    }

   
    
})

router.delete('/deleteTask/:id',(req,res)=>{
    const {id}=req.params

    TODO.findByIdAndDelete(id)
    .then((data)=>{
        return res.status(201).json({message:'Deleted sucessfully'})
    })
    .catch((err)=>{
        return res.status(422).json({error:'Something went wrong'})
    })
})


router.put('/updateTask/:id',(req,res)=>{

    const {id}= req.params
    const {task ,priority} =req.body
    TODO.findOne({task:task, priority:priority}).then((data)=>{
        if(data){
            return res.status(422).json({error:'Task already exists'})
        }else{
            TODO.findByIdAndUpdate(id ,{
                task:task,
                priority:priority
            },{
                new:true
            }).then((data)=>{
                return res.status(201).json({message :'Updated successfully',data})
            }).catch((err)=>{
                return res.status(422).json({error:'Something went wrong'})
            })
        }
    })
  

})

router.put('/updateDetails/:id',(req,res)=>{
    const {id}=req.params
   
TODO.findOneAndUpdate({ _id: id }, { $set: { completed: true } },{new:true})
  .then(data => {

    return res.status(201).json({message:'Task completed',data})
  })
  .catch(error => {
    
   return res.status(422).json({error:'something went wrong',error})
  });
})

router.put('/updateData/:id',(req,res)=>{
    const {id}=req.params
   
TODO.findOneAndUpdate({ _id: id }, { $set: { completed: false } },{new:true})
  .then(data => {

    return res.status(201).json({message:'Task is not completed',data})
  })
  .catch(error => {
    
   return res.status(422).json({error:'something went wrong',error})
  });
})
module.exports =router