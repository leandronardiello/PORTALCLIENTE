import fetch from 'node-fetch';
import { apiUrl, basicAuth } from '../config/config.js';
//import { getClienteInfo } from '../controllers/authController.js';


export const login = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        return res.status(400).json({ success: false, message: 'CNPJ, CPF e senha são obrigatórios' });
    }

    try {
        // Etapa 1: Obter o token da API de autenticação
        const tokenResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username: 'admin',
                password: 'msmvk',
            }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok) {
            throw new Error('Erro na autenticação: ' + tokenData.error);
        }

        const accessToken = tokenData.access_token;

        // Etapa 2: Consumir a API VKPCLOGIN com o token e os dados do usuário
        const apiResponse = await fetch('http://192.168.0.251:8400/rest/VKPCLOGIN', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user,
                password
            }),
        });

        const apiData = await apiResponse.json();

        if (apiData.success === true) {
            res.json({ success: true, data: apiData });
        } else {
            res.status(401).json({ success: false, message: 'Usuário não autenticado' });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};

// Certifique-se de que a função getClienteInfo está definida apenas uma vez
export const getClienteInfo = (req, res) => {
    if (clienteInfo && clienteInfo.razaosocial) {
        // Retorna o sucesso com o razaosocial como JSON
        res.json({ success: true, razaosocial: clienteInfo.razaosocial });
    } else {
        // Retorna um erro em formato JSON se não houver informações do cliente
        res.status(404).json({ success: false, message: 'Informações do cliente não encontradas' });
    }
};




