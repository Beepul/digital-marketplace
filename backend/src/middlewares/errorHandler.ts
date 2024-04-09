import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'
    let data = err.data || null 

    if(err instanceof ZodError){
        statusCode = 422
        message = "Validation Failed"
        data = {}

        const zodErrs = err.errors

        if(Array.isArray(zodErrs)){
            zodErrs.map((zodErr) => {
                data[zodErr.path[0]] = zodErr.message
            })
        }
    }

    res.status(statusCode).json({
        result: data,
        message: message,
        meta: null
    })
}


export default errorHandler