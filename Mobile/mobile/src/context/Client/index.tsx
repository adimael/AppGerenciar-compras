//Editar clientes
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

type ClientContextType = {
  editClient: (
    id: string,
    data: { nome: string; email: string; data_nascimento: string }
  ) => Promise<void>;
  inativarCliente: (id: string) => Promise<void>;
  addClient: (data: {
    nome: string;
    email: string;
    data_nascimento: string;
  }) => Promise<any>;
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
      console.log(id, data);
      await axios.put(`http://10.0.0.40:3001/clientes/${id}`, data);
      alert("Cliente atualizado com sucesso!");
    } catch (error) {
      console.log("erro do console: ", error);
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente.");
    } finally {
      setLoading(false);
    }
  };

  //Inativar Client
  const inativarCliente = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `http://10.0.0.40:3001/clientes/${id}/inativar`
      );

      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Erro ao inativar cliente");
      }

      alert("Cliente inativado com sucesso!");
    } catch (error) {
      console.error("Erro ao inativar cliente:", error);
      alert("Não foi possível inativar o cliente. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  //Adicionar cliente
  const addClient = async (data: {
    nome: string;
    email: string;
    data_nascimento: string;
  }) => {
    try {
      const response = await axios.post("http://localhost:3001/clientes", data);
      alert("Cliente adicionado com sucesso!");
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      alert("Erro ao adicionar cliente.");
      throw error;
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
