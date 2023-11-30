import sendEmail from '../controllers/reset.js';
import { Router } from "express"; 
const router = Router()

router.post('/', sendEmail);

export default router;
