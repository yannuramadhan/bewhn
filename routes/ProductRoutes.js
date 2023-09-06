import express from "express";
import { 
    getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct 
} from "../controllers/ProductControllers.js";
import { fileURLToPath } from 'url';
import multer from "multer";
import path from "path";


const router =  express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'images');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' 
  || file.mimetype === 'image/jpg' 
  || file.mimetype === 'image/jpeg'
  ){
    cb(null, true);
  }else{
    cb(new Error('File type is not supported'), false);
  }
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', upload.single('foto'), createProduct);
router.put('/products/:id', upload.single('foto'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;