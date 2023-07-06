const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://to-do-list:admin@to-do-list.pcczub9.mongodb.net/')
.then(()=>console.log('connected'))
.catch((err)=>console.log('something went wrong',err))