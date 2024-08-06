import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        
    },
    password :{
        type : String,
        required : true,
        minLength : [5 , 'Min Length']
    
    },
    role :{
        type : String,
        default : "customer",
        enum : ["customer","admin","chef","waiter"]

    }  
},
{
    timestamps : true
});
const User = mongoose.model('User', userSchema);

export default User;




