import { useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import ModalProduto from '../components/ModalProduto';

export default function Produtos() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [produtos, setProdutos] = useState<Array<{ name: string; price: number }>>([]);

  const handleNewProduct = (name: string, price: number) => {
    setProdutos([...produtos, { name, price }]);
  };

  return (
    <>
    <Head>
        <title>Produtos</title>
    </Head>
    
      <Header />
      <div style={{ position: 'relative', padding: '20px', minHeight: 'calc(100vh - 60px)' }}>
        <button className="novo-produto-button" onClick={() => setModalOpen(true)}>
          Novo Produto
        </button>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <h1>Produtos</h1>
          <p>Aqui está a lista de produtos.</p>
        </div>

        {/* Modal de Cadastro de Produto */}
        <ModalProduto isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNewProduct} />

        <div className="clientes-container">
        {produtos.map((produto, index) => (
          <div className="cliente-card" key={index}>
            <div className="cliente-info">
              <h3>{produto.name}</h3>
              <p>R${produto.price}</p>
            </div>

            <div className="cliente-actions">
              <button >Editar</button>
              <button >Excluir</button>
            </div>
          </div>
        ))}
      </div>

      </div>
      <Footer />
    </>
  );
}

