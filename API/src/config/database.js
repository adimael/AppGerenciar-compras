const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

(async () => {
  try {
    // Criar banco de dados se não existir
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }).promise(); // Adicionando o wrapper de promessas

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    console.log(`Banco de dados '${process.env.DB_NAME}' verificado/criado.`);
    await connection.end();

    // Criar tabelas se não existirem
    await db.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        data_nascimento DATE NOT NULL,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        marca VARCHAR(100),
        preco DECIMAL(10, 2) NOT NULL,
        quantidade INT DEFAULT 0,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS ClientesCompramProdutos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_cliente INT,
        id_produto INT,
        quantidade INT NOT NULL,
        data_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('finalizado', 'cancelado') DEFAULT 'finalizado',
        UNIQUE (id_cliente, id_produto), -- Garantir que a combinação de cliente e produto seja única
        FOREIGN KEY (id_cliente) REFERENCES Clientes(id),
        FOREIGN KEY (id_produto) REFERENCES Produtos(id)
      );
    `);

    console.log("Tabelas verificadas/criadas com sucesso.");
  } catch (err) {
    console.error("Erro ao criar banco de dados ou tabelas:", err);
  }
})();

module.exports = db;
