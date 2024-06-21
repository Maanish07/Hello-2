import express from 'express';
const router = express.Router();
import Item from '../models/Item.js'


router.post('/item', async (req, res) => {
    console.log('from backend Post' , req);
    const newItem = new Item({
      name: req.body.foodItem.name,
      price: req.body.foodItem.price,
      description : req.body.foodItem.description,
      quantity: req.body.quantity
    });
  
    newItem.save()
      .then(item => res.json(item))
      .catch(err => console.log(err));
});

router.get('/item' , async(req,res) =>{
    try {
      
      const allItems = await Item.find();
      res.status(200).json(allItems);
    } 
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

export default router;