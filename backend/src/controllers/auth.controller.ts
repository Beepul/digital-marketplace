import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../middlewares/asyncHandler";
import { z } from "zod";


const registerUser = asyncHandler(async (req: Request,res: Response ,next: NextFunction) => {

        const payload = req.body 
    
        // console.log("::::",result)
    
        res.status(200).json({
            message: "User register success",
            result: payload,
            meta: null
        })
        
})


export const authController =  {
    registerUser
}