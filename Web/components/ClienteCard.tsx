type ClienteCardProps = {
  nome: string;
  email: string;
  nascimento: string;
  ativo: boolean; // Agora recebemos o estado "ativo"
  onEdit: () => void;
  onInativar: () => void;
};

const ClienteCard = ({ nome, email, nascimento, ativo, onEdit, onInativar }: ClienteCardProps) => {
  return (
    <div className={`cliente-card ${ativo ? '' : 'inativo'}`}> 
      <div className="cliente-info">
        <h3>{nome}</h3>
        <p>{email}</p>
        <p>{nascimento}</p>
      </div>
      <div className="cliente-actions">
        <button onClick={onEdit}>Editar</button>
        <button onClick={onInativar}>
          {ativo ? 'Inativar' : 'Ativar'}
        </button>
      </div>
    </div>
  );
};

export default ClienteCard;
