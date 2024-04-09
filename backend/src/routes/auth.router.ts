import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { registerSchema } from "../utils/ValidatorSchema";
import { bodyValidator } from "../middlewares/validator.middleware";
import { setPath, upload } from "../middlewares/uploader.middleware";


const router = Router()


router.post('/register', setPath('users'), upload.single('image') ,bodyValidator(registerSchema) , authController.registerUser)


export default router