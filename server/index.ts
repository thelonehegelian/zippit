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

// Middleware

const __filename = fileURLToPath(import.meta.url);
