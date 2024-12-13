const express = require("express");
const router = express.Router();
const clientesCompramProdutosController = require("../controllers/clientesCompramProdutosController");

// Rota para registrar a compra de produtos
router.post("/registrarCompra", clientesCompramProdutosController.registrarCompra);

// Rota para cancelar a compra de produtos
router.post("/cancelarCompra", clientesCompramProdutosController.cancelarCompra);

module.exports = router;
