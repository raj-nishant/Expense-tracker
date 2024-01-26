const { Expenses } = require("../model/model")

module.exports.postExpensesCont=async(req,res,next)=>{
    const amount=req.body.amount
    const description=req.body.description
    const category=req.body.category
    const createExpense=await Expenses.create({
        amount:amount,
        description:description,
        category:category
    })
    try {
        res.status(201).json(createExpense)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports.getExpensesCont=async(req,res,next)=>{
    const getExpenses= await Expenses.findAll()
    try {
        res.status(200).json(getExpenses)
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteExpensesCont=async(req,res,next)=>{
    const deleteExpense=await Expenses.findByPk(req.params.Id)
    try {
        const deletion=await deleteExpense.destroy();
        try {
            res.status(200).send('DELETED')
        } catch (error) {
            throw new Error()
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUpdateExpensesCont=async(req,res,next)=>{
    const getExpense=await Expenses.findByPk(req.params.Id)
    try {
        res.json(getExpense)
    } catch (error) {
        console.log(error);
    }
}

module.exports.putUpdateExpensesCont=async(req,res,next)=>{
    const putExpense=await Expenses.findByPk(req.params.Id)
    try {
        putExpense.amount=req.body.amount
        putExpense.description=req.body.description
        putExpense.category=req.body.category
        const update=await putExpense.save()
        try {
            res.json(update)
        } catch (error) {
            throw new Error()
        }
    } catch (error) {
        console.log(error);
    }
}