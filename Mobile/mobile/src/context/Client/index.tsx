//Editar clientes
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

type ClientContextType = {
  editClient: (
    id: string,
    data: { nome: string; email: string; data_nascimento: string }
  ) => Promise<void>;
};

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const editClient = async (
    id: string,
    data: { nome: string; email: string; data_nascimento: string }
  ) => {
    setLoading(true);
    try {
      await axios.put(`http://192.168.137.87:8081/clientes/${id}`, data);
      alert("Cliente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientContext.Provider value={{ editClient, inativarCliente, addClient }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient deve ser usado dentro de um ClientProvider");
  }
  return context;
};

//Inativar Client
const inativarCliente = async (id: string) => {
  try {
    const response = await fetch(
      `http://192.168.137.87:8081/clientes/${id}/inativar`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao inativar cliente");
    }

    // Tenta retornar o JSON apenas se existir
    const data = response.status !== 204 ? await response.json() : null;
    alert("Cliente inativado com sucesso!");
    return data;
  } catch (error) {
    console.error("Erro:", error);
    alert("Não foi possível inativar o cliente.");
  }
};

//Adicionar cliente
const addClient = async (data: {
  nome: string;
  email: string;
  data_nascimento: string;
}) => {
  try {
    const response = await axios.post(
      "http://192.168.137.87:8081/clientes",
      data
    );
    alert("Cliente adicionado com sucesso!");
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar cliente:", error);
    alert("Erro ao adicionar cliente.");
    throw error;
  }
};
