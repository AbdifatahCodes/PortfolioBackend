import express from 'express';
import { sendOrderEmail } from '../controllers/emailController';

const router = express.Router();

router.post('/send-order-email', sendOrderEmail);

export default router;
