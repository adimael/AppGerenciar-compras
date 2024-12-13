const mysql = require("mysql2");
const db = require("../config/database");

// Função para registrar a compra
exports.registrarCompra = async (req, res) => {
  const { id_cliente, id_produto, quantidade } = req.body;

  if (!id_cliente || !id_produto || !quantidade) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
  }

  try {
    // Verifica se o cliente existe
    const [cliente] = await db.query("SELECT * FROM clientes WHERE id = ?", [id_cliente]);
    if (cliente.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado." });
    }

    // Verifica se o produto existe e está ativo
    const [produto] = await db.query("SELECT * FROM produtos WHERE id = ?", [id_produto]);
    if (produto.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    if (produto[0].status === "inativo") {
      return res.status(400).json({ message: "Produto está inativo e não pode ser vendido." });
    }

    const estoqueAtual = produto[0].estoque;

    // Verifica se há estoque suficiente
    if (estoqueAtual < quantidade) {
      return res.status(400).json({ message: "Estoque insuficiente para a quantidade solicitada." });
    }

    try {
      // Registra a compra
      await db.query(
        "INSERT INTO clientesCompramProdutos (id_cliente, id_produto, quantidade, status) VALUES (?, ?, ?, 'finalizado')",
        [id_cliente, id_produto, quantidade]
      );

      // Atualiza o estoque do produto
      await db.query(
        "UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?",
        [quantidade, id_produto]
      );

      res.status(201).json({
        message: "Compra registrada com sucesso",
        compra: { id_cliente, id_produto, quantidade, data_compra: new Date(), status: "finalizado" },
      });
    } catch (insertErr) {
      if (insertErr.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          message: "Já existe uma compra registrada para este cliente e este produto.",
        });
      }
      throw insertErr;
    }
  } catch (err) {
    res.status(500).json({
      message: "Erro interno ao registrar a compra",
      error: err.message,
    });
  }
};

// Função para cancelar a compra
exports.cancelarCompra = async (req, res) => {
  const { id_cliente, id_produto } = req.body;

  // Verifica se os campos estão presentes e não são vazios
  if (!id_cliente || !id_produto) {
    return res.status(400).json({ message: "Preencha todos os campos obrigatórios." });
  }

  // Verifica se id_cliente e id_produto são números válidos
  if (isNaN(id_cliente) || isNaN(id_produto)) {
    return res.status(400).json({ message: "Os campos id_cliente e id_produto devem ser números válidos." });
  }

  try {
    // Verifica se a compra existe e está finalizada
    const [compra] = await db.query(
      "SELECT * FROM clientesCompramProdutos WHERE id_cliente = ? AND id_produto = ? AND status = 'finalizado'",
      [id_cliente, id_produto]
    );

    if (compra.length === 0) {
      return res.status(404).json({ message: "Compra não encontrada para cancelar." });
    }

    const quantidade = compra[0].quantidade;

    // Atualiza o status da compra para 'cancelado'
    await db.query(
      "UPDATE clientesCompramProdutos SET status = 'cancelado' WHERE id_cliente = ? AND id_produto = ?",
      [id_cliente, id_produto]
    );

    // Restaura o estoque do produto
    await db.query(
      "UPDATE produtos SET quantidade = quantidade + ? WHERE id = ?",
      [quantidade, id_produto]
    );

    res.status(200).json({ message: "Compra cancelada com sucesso e estoque restaurado." });
  } catch (err) {
    res.status(500).json({
      message: "Erro interno ao cancelar a compra",
      error: err.message,
    });
  }
};

