import { Request } from "express";

declare global{
    namespace Express{
        interface Request{
            uploadDir?: string;
        }
    }
}

// declare module "express" {
//     interface Request {
//         uploadDir?: string;
//     }
// }