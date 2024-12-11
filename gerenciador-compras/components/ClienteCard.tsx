type ClienteCardProps = {
  nome: string;
  email: string;
  nascimento: string;
  onEdit: () => void;
  onInativar: () => void;
};

const ClienteCard = ({ nome, email, nascimento, onEdit, onInativar }: ClienteCardProps) => (
  <div className="cliente-card">
    <div className="cliente-info">
      <h3>{nome}</h3>
      <p>{email}</p>
      <p>{nascimento}</p>
    </div>
    <div className="cliente-actions">
      <button onClick={onEdit}>Editar</button>
      <button onClick={onInativar}>Inativar</button>
    </div>
  </div>
);

export default ClienteCard;
