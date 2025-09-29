const express = require('express');
const crypto = require('crypto');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3016;

// Configuración de la conexión a MariaDB
const dbConfig = {
  host: 'localhost',
  user: 'rogelio',
  password: '1603',
  database: 'project_example'
};

// Crear conexión a la base de datos
const connection = mysql.createConnection(dbConfig);

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a MariaDB/MySQL');
  
  // Crear tabla de usuarios si no existe
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creando tabla:', err);
    } else {
      console.log('Tabla de usuarios verificada/creada');
    }
  });
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Función para encriptar contraseña
function encryptPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Ruta GET: Obtener todos los usuarios (solo para testing)
app.get('/users', (req, res) => {
  connection.query('SELECT id, username, email, created_at FROM users', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Ruta POST: Login de usuario
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Usuario y contraseña son requeridos' 
    });
  }

  // Buscar usuario por username o email
  const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
  connection.query(query, [username, username], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }

    if (results.length === 0) {
      return res.json({ 
        success: false, 
        message: 'Usuario no encontrado' 
      });
    }

    const user = results[0];
    const encryptedPassword = encryptPassword(password);

    // Verificar contraseña
    if (user.password === encryptedPassword) {
      res.json({ 
        success: true, 
        message: 'Login exitoso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } else {
      res.json({ 
        success: false, 
        message: 'Contraseña incorrecta' 
      });
    }
  });
});

// Ruta POST: Registro de usuario
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son requeridos' 
    });
  }

  // Verificar si el usuario ya existe
  const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
  connection.query(checkQuery, [username, email], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error del servidor' 
      });
    }

    if (results.length > 0) {
      const existingUser = results[0];
      if (existingUser.username === username) {
        return res.json({ 
          success: false, 
          message: 'El nombre de usuario ya existe' 
        });
      }
      if (existingUser.email === email) {
        return res.json({ 
          success: false, 
          message: 'El email ya está registrado' 
        });
      }
    }

    // Encriptar contraseña
    const encryptedPassword = encryptPassword(password);

    // Insertar nuevo usuario
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(insertQuery, [username, email, encryptedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Error creando usuario' 
        });
      }

      res.json({ 
        success: true, 
        message: 'Usuario registrado exitosamente',
        user: {
          id: result.insertId,
          username: username,
          email: email
        }
      });
    });
  });
});

// Ruta GET existente: Saludo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde el backend!' });
});

// Iniciar servidor
app.listen(port, 'localhost', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Cerrar conexión al apagar (opcional, para limpieza)
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});