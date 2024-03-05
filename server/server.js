const express = require('express')
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors');
const userRouter = require('./src/routes/userRouter');
const buissnessRouter = require('./src/routes/buissnessRouter');
const adminRouter = require('./src/routes/adminRouter');
const messageRouter = require('./src/routes/messageRouter');





app.use(bodyparser.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRouter)
app.use('/buissness',buissnessRouter)
app.use('/admin',adminRouter)
app.use('/message',messageRouter)

app.listen(5000,() => {
    console.log('server started')
})