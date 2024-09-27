import express from 'express';
import { login , getClienteInfo} from '../controllers/authController.js';
//import { getClienteInfo } from '../controllers/authController.js';

const router = express.Router();

// Rota de login
router.post('/login', login);

// Rota para obter as informações do cliente
router.get('/auth/getClienteInfo', getClienteInfo);
 

export default router;
