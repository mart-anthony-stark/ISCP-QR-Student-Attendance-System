import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (req:Request, file:any, cb:any) => {
    cb(null, "images");
  },
  filename: (req:any, file:any, cb:any) => {
    const filename = Date.now() + path.extname(file.originalname);
    console.log(file);
    req.image = filename;
    cb(null, filename);
  },
});
const upload = multer({ storage });

module.exports = upload;