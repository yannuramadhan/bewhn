import express from "express";
import { 
    getArticles, 
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle 
} from "../controllers/ArticleControllers.js";
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

router.get('/articles', getArticles);
router.get('/articles/:id', getArticleById);
router.post('/articles', upload.single('foto'), createArticle);
router.put('/articles/:id', upload.single('foto'), updateArticle);
router.delete('/articles/:id', deleteArticle);

export default router;