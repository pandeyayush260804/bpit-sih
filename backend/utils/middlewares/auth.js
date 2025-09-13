import { verifyToken } from "../services/token.js";

export const auth=(req,res,next)=>{
    const token=req.headers['authorize'];
    if(!token){
        res.status(401).json({message:"UnAuthorize User"})
    }
    else{
        try{
            const email=verifyToken(token);
            next();
        }catch(err){
            res.status(401).json({message:"UnAuthorize User"})
        }
        
    }

}
