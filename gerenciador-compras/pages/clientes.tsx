import React, { useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import ClienteCard from '../components/ClienteCard';


export default function Clientes() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clientes, setClientes] = useState<Array<{ name: string; email: string; dob: string, active: boolean }>>([]);
  const [clienteEditando, setClienteEditando] = useState(null);

  const handleNewClient = (name: string, email: string, dob: string) => {
    setClientes([...clientes, { name, email, dob, active: true }]);
  };


  return (
    <>
      <Head>
        <title>Clientes</title>
      </Head>

      <Header />
      <div style={{ position: 'relative', padding: '20px', minHeight: 'calc(100vh - 60px)' }}>
        <button className="novo-cliente-button" onClick={() => setModalOpen(true)}>
          Novo Cliente
        </button>

        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <h1>Clientes</h1>
          <p>Aqui está a lista de clientes.</p>

        </div>

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleNewClient} />

        <div className="clientes-container">
        {clientes.map((cliente, index) => (
          <div className="cliente-card" key={
            index}>
            <div className="cliente-info">
              <h3>{cliente.name}</h3>
              <p>{cliente.email}</p>
              <p>{cliente.dob}</p>
            </div>

            <div className="cliente-actions">
              <button >Editar</button>
              <button >Inativar</button>
            </div>
          </div>
        ))}
      </div>

      </div>
      <Footer />
    </>
  );
}

