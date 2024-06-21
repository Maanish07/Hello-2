import jwt from "jsonwebtoken"

function varifyToken (req,res, next){
    const bearerHeader = req.headers['Authorization'];
    if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    }
    else{
      res.send({result: "token is not valid"})
    }
    
}


export default {varifyToken};