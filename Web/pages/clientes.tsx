import React, { useState } from 'react';
import Header from '../components/Header';
import Head from 'next/head';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import ClienteCard from '../components/ClienteCard';

export default function Clientes() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [clientes, setClientes] = useState<Array<{ name: string; email: string; dob: string; active: boolean }>>([]);
  const [clienteEditando, setClienteEditando] = useState<{ name: string; email: string; dob: string } | null>(null);

  const handleNewClient = (name: string, email: string, dob: string) => {
    setClientes([...clientes, { name, email, dob, active: true }]);
  };

  const handleEditClient = (name: string, email: string, dob: string) => {
    const updatedClientes = clientes.map(cliente =>
      cliente.email === email ? { ...cliente, name, dob } : cliente
    );
    setClientes(updatedClientes);
  };

  const openEditModal = (cliente: { name: string; email: string; dob: string }) => {
    setClienteEditando(cliente);
    setModalOpen(true);
  };

  const toggleAtivar = (email: string) => {
    const updatedClientes = clientes.map((cliente) =>
      cliente.email === email ? { ...cliente, active: !cliente.active } : cliente
    );
    setClientes(updatedClientes);
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

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setClienteEditando(null); // Limpa o estado de edição ao fechar o modal
          }}
          onSubmit={clienteEditando ? handleEditClient : handleNewClient}
          clienteEditando={clienteEditando}
        />

        <div className="clientes-container">
          {clientes.map((cliente, index) => (
            <ClienteCard
              key={index}
              nome={cliente.name}
              email={cliente.email}
              nascimento={cliente.dob}
              ativo={cliente.active} // Passando o estado "ativo"
              onEdit={() => openEditModal(cliente)}
              onInativar={() => toggleAtivar(cliente.email)} // Alterna o estado ativo
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
