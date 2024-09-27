import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';


const app = express();

// Middleware para servir arquivos estáticos (CSS, JS)
app.use(express.static('public'));

//app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRoutes);  // Prefixo "/api" para evitar conflito


// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use('/auth', authRoutes);
// Usar as rotas de autenticação
//app.use(authRoutes);

// Obter o diretório atual corretamente em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir a tela de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Rota para a página inicial (após o login)
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  });


  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
        console.log(middleware.route.path);  // Isso imprimirá todas as rotas registradas
    }
});



app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});