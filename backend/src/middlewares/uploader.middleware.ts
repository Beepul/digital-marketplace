import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback } from "multer";
import fs from 'fs'
import { generateRandomString } from "../utils/Helpers";

const setPath = (path: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        req.uploadDir = path 
        next()
    }
}

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = "./public/uploads/"+req.uploadDir

        if(!fs.existsSync(path)){
            fs.mkdirSync(path, {
                recursive: true
            })
        }

        cb(null, path)
    },
    filename(req, file, callback) {
        const ext = file.originalname.split('.').pop()
        const filename = Date.now()+'-'+generateRandomString(10)+'.'+ext 

        callback(null, filename)
    },
})

const imageFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = file.originalname.split('.').pop() || ''
    const allowed = ['jpg','jpeg','png','svg','webp','gif','bmp']
    
    if(allowed.includes(ext.toLowerCase())){
        cb(null,true)
    }else{
        cb({name: 'Failed to upload image!',message: "Image format not supported"})
    }
}

const upload = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fieldSize: 3000000 // upto 3mb
    }
})


export {
    setPath,
    upload
}