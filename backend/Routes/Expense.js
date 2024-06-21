import express from 'express';
const router = express.Router();
import Expense from '../models/Expense.js';


router.post('/expense', async (req, res) => {
  try {
    
    const newExpense = new Expense({
      name: req.body.name,
      price: req.body.price,
      
    });

    
    const savedExpense = await newExpense.save();
    console.log(savedExpense)

    res.status(201).json(savedExpense); 
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }


});

router.get('/expense' , async(req,res) =>{
  try {
    
    const allExpense = await Expense.find();
    res.status(200).json(allExpense);
  } 
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;