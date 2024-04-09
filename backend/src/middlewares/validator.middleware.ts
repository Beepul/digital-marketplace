import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const bodyValidator = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const payload = req.body 
            await schema.parseAsync(payload)
            next()
        } catch (error) {
            next(error)
        }
    }
}

export {
    bodyValidator
}