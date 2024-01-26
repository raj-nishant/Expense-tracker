const express=require('express');
const app=express();
const router=require('./router/router');
const bodyparser=require('body-parser');
const database=require('./database/database');
const cors=require('cors');
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(router);
database.sync()
.then(res=>{
    app.listen(5100)
})
.catch(err=>console.log(err))
// app.listen(5100)