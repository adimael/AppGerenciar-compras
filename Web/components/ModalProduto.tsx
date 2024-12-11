import React, { useState } from 'react';
import { validatePrice } from '../utils/validatePrice';

interface ModalProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, price: number) => void;
}

const ModalProduto: React.FC<ModalProdutoProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de preço
    if (!validatePrice(price)) {
      setError('Preço inválido! Deve ser um número positivo.');
      return;
    }

    // Envia os dados para o componente pai
    onSubmit(name, parseFloat(price.replace(',','.')));
    onClose(); // Fecha o modal após o envio
    setName('');
    setPrice('');
  };

  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Cadastrar Novo Produto</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Digite o nome do produto"
              className="nome-input"
            />
          </div>
          <div className="input-group">
            <label>Preço</label>
            <input
              type="text"
              value={`R$ ${price}`}
              onChange={(e) => setPrice(e.target.value.replace(/[^\d,\.]/g, ''))}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button type="submit" className="submit-button">Cadastrar</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProduto;
