import express from "express";
import db from "./config/connection.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import ArticleRoutes from "./routes/ArticleRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';


dotenv.config();
const app = express()
const expressPort = process.env.APP_PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => res.send('REST API WHN'));


try {
  await db.authenticate();
  console.log('Database Connected');
} catch (error) {
  console.error(error);
}

app.use(cors({
  origin: '*',
  methods: '*',
  credentials: true,
}));

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers','*');
  res.setHeader('Content-Security-Policy', "default-src 'self' *; connect-src 'self' *;"); 
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

app.use(cookieParser());
app.use(express.json());

app.use(AuthRoutes);
app.use(UserRoutes);
app.use(ProductRoutes);
app.use(ArticleRoutes);



app.listen(expressPort, () => console.log(`You are running on port ${expressPort}!`));