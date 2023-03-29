import express, { Express } from 'express';
import boydParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
const helmet = require('helmet');
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

// Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
