require('./config/db')
const express =require('express')
const cors =require('cors')
const app =express()
const bodyParser=require('body-parser')
const routing =require('./router/toDoRoute')
require('./model/toDo')
app.use(cors())
app.use(express.json())




app.use(require('./router/toDoRoute'))


app.get('/',(req,res)=>{
    res.send('hlo user')
})

app.listen(5000,()=>{
  console.log('app is listening on port 5000');  
})