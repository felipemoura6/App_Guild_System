const express = require('express');
const mysql = require('mysql');
const path = require('path'); // Add this line
const app = express();
const port = 3006;
const cors = require('cors');

// Permitir todas as origens
app.use(cors());

const corsOptions = {
  origin: 'http://localhost:5173', // permitir apenas solicitações de http://localhost:5173
};

app.use(cors(corsOptions));


// Configurações do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'GuildSystem'
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Middleware para parsing de JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Bem-vindo ao Guild DeathChasesYoou System!');
});


// Rota para listar membros da guild
app.get('/members', (req, res) => {
  db.query('SELECT * FROM Players', (err, results) => {
    if (err) {
      console.error('Erro ao listar membros da guild:', err);
      res.status(500).send('Erro ao listar membros da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Rota para listar membros novos da guild
app.get('/information/newmembers', (req, res) => {
  db.query('SELECT * FROM Players ORDER BY date_of_joining DESC LIMIT 10', (err, results) => {
    if (err) {
      console.error('Erro ao listar membros novos da guild:', err);
      res.status(500).send('Erro ao listar membros novos da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Rota para listar status da guild
app.get('/information/status', (req, res) => {
  db.query('SELECT * FROM Guild', (err, results) => {
    if (err) {
      console.error('Erro ao listar status da guild:', err);
      res.status(500).send('Erro ao listar status da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Rota para listar history
app.get('/history', (req, res) => {
  db.query('SELECT history FROM Guild where id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar história da guild:', err);
      res.status(500).send('Erro ao listar história da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Rota para listar mensagem de boas-vindas
app.get('/information/welcome', (req, res) => {
  db.query('SELECT welcome FROM Guild where id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar mensagem da guild:', err);
      res.status(500).send('Erro ao listar mensagem da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Rota para listar mensagem de boas-vindas
app.get('/awards', (req, res) => {
  db.query('SELECT awards FROM Guild where id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar conquistas da guild:', err);
      res.status(500).send('Erro ao listar conquistas da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});

// Rota para listar mensagem de boas-vindas
app.get('/information/news', (req, res) => {
  db.query('SELECT * FROM News where guild_id=1', (err, results) => {
    if (err) {
      console.error('Erro ao listar notícias da guild:', err);
      res.status(500).send('Erro ao listar notícias da guild');
      return;
    }
    res.json(results); // Envia os resultados como JSON
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});