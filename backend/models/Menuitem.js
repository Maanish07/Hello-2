import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema(
    {   
        image :{
            type : String,
            required : true,
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        veg:{
            type: String,
            required: true
        },
        bestsellers:{
            type : String,
            
        },
        description: {
            type: String,
            required: true
        },
        qunatity :{
            type : Number,
            
        }  
    }
);
const Menu = mongoose.model('Menu', menuSchema);
export default Menu;
