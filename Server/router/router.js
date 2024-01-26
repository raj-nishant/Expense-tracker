const express=require('express')
const controller=require('../controller/controller')
const router=express.Router()

router.post('/postExpenses',controller.postExpensesCont);

router.get('/',controller.getExpensesCont);

router.delete('/deleteExpenses/:Id',controller.deleteExpensesCont);

router.get('/updateExpenses/:Id',controller.getUpdateExpensesCont);

router.put('/updateExpenses/:Id',controller.putUpdateExpensesCont);

module.exports=router