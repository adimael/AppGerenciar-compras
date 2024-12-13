import React, { useState, useEffect } from 'react';
import { validateEmail } from '../utils/validateEmail';
import { validateAge } from '../utils/validateAge';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, email: string, dob: string) => void;
  clienteEditando: { name: string; email: string; dob: string } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, clienteEditando }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');

  // Limpar o erro sempre que o modal for aberto (se for edição)
  useEffect(() => {
    if (clienteEditando) {
      setName(clienteEditando.name);
      setEmail(clienteEditando.email);
      setDob(clienteEditando.dob);
      setError(''); // Limpa o erro quando editar
    }
  }, [clienteEditando, isOpen]); // Limpa erro quando o modal for aberto ou quando houver cliente para editar

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação de email e idade
    if (!validateEmail(email)) {
      setError('Email inválido!');
      return;
    }

    if (!validateAge(dob)) {
      setError('Insira uma data de nascimento válida.');
      return;
    }

    onSubmit(name, email, dob); // Passa os dados atualizados
    onClose();
    setName('');
    setEmail('');
    setDob('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{clienteEditando ? 'Editar Cliente' : 'Cadastrar Novo Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Sampas"
              className="nome-input"
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="sampas@email.com"
              className="nome-input"
            />
          </div>
          <div className="input-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="modal-buttons">
            <button type="submit" className="submit-button">Salvar</button>
            <button type="button" className="cancel-button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
