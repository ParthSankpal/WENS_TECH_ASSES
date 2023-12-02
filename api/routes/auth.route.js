import express from 'express';
import { signup } from '../controllers/auth.controller.js';
const router = express.Router();


const authRoute = router.post("/signup", signup);

export default authRoute;