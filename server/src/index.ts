import express, { Express } from 'express';
import boydParser from 'body-parser';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// handles file uploads
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load environment variables
dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
// By default, the body-parser middleware limits the size of the request body
// to 1mb and parses the body using strict mode, which means that it only accepts JSON objects and arrays.
app.use(bodyParser.json({ limit: '30mb', strict: true }));
// parses incoming requests with URL-encoded payloads, with a limit of 30 megabytes, and allows for parsing of extended URL-encoded syntax
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
// serving static files in the public/assets directory and makes them accessible through the /assets URL path.
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File Storage

/*  
Multer is a middleware that handles multipart/form-data, which is primarily used for uploading files.
The diskStorage function from the multer package is used to create an
object with two properties: destination and filename.
The destination property specifies the directory where uploaded files will be stored, 
and the filename property specifies the name that will be given to the uploaded file. 
In this case, the destination is set to 'public/assets', 
and the filename is set to the original name of the uploaded file
*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Mongoose Connection
const PORT = process.env.PORT || 6001;
let mongoURI = process.env.MONGO_URL;
if (!mongoURI) {
  console.error('MONGO_URL not defined');
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
