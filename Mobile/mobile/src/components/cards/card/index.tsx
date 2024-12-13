import React, { useState } from "react";
import { Text, View, Button, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import ButtonCircle from "../../buttons/buttonCircle";
import InputAdd from "../../inputs/inputAdd";
import { useClient } from "../../../context/Client";

type Data = {
  id: string;
  title: string;
  username: string;
  createdAt: string;
  data_nascimento: string;
};

type CardProps = {
  data: Data;
  onUpdateClient: (updatedClient: Data) => void;
};

export default function Card({ data, onUpdateClient }: CardProps) {
  const { editClient } = useClient();
  const { inativarCliente } = useClient();
  const [visibleModalDel, setVisibleModalDel] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [dob, setDob] = useState("");
  const [updatedData, setUpdatedData] = useState(data); // Estado para editar os dados

  const handleInactivate = async () => {
    try {
      await inativarCliente(data.id);
      setVisibleModalDel(false);
      alert("Usuário inativado com sucesso!");
    } catch (error) {
      console.error("Erro ao inativar cliente:", error);
    }
  };

  // Função para salvar as alterações
  const handleSave = async () => {
    //Validação da data de nascimento
    if (!dob.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      alert("Data de nascimento inválida!");
      return;
    }
    try {
      await editClient(data.id, {
        nome: updatedData.title,
        email: updatedData.username,
        data_nascimento: dob,
      });
      onUpdateClient({ ...updatedData, createdAt: dob });
      setVisibleModalEdit(false);
    } catch (error) {
      console.error("Erro ao salvar cliente: ", error);
      alert("Não foi possível salvar as alterações. Tente novamente.");
    }
  };

  const handleDobChange = (input: string) => {
    const numericInput = input.replace(/\D/g, "").slice(0, 8);
    let formatted = numericInput;
    if (numericInput.length > 2)
      formatted = `${numericInput.slice(0, 2)}/${numericInput.slice(2)}`;
    if (numericInput.length > 4)
      formatted = `${formatted.slice(0, 5)}/${numericInput.slice(4)}`;
    setDob(formatted);
  };

  // Função para abrir a modal
  const handleOpenModal = () => {
    setVisibleModalDel(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.email}>{data.username}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Editar"
            className="editClient"
            onPress={() => setVisibleModalEdit(true)}
            color="#7104FF"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Inativar"
            className="delet"
            onPress={handleOpenModal}
            color="#F44336"
          />
        </View>

        {/* Modal inativar perfil */}
        <Modal
          visible={visibleModalDel}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setVisibleModalDel(false)} // Fecha a modal
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 30,
                  marginRight: 150,
                }}
              >
                <ButtonCircle
                  className="return"
                  iconName="arrow-left"
                  onPress={() => setVisibleModalDel(false)} // Fecha a modal ao pressionar o ícone de voltar
                />
                <Text style={styles.modalTitle}>Inativar usuário</Text>
              </View>

              <Text style={styles.textDel}>
                Tem certeza que deseja inativar este usuário?
              </Text>

              {/* Botões */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setVisibleModalDel(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleInactivate}
                >
                  <Text style={styles.deleteButtonText}>Inativar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal editar perfil */}
        <Modal
          visible={visibleModalEdit}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setVisibleModalEdit(false)} // Fecha a modal
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 30,
                  marginRight: 180,
                }}
              >
                <ButtonCircle
                  className="return"
                  iconName="arrow-left"
                  onPress={() => setVisibleModalEdit(false)} // Fecha a modal ao pressionar o ícone de voltar
                />
                <Text style={styles.modalTitle}>Editar perfil</Text>
              </View>

              {/* Input para o nome */}
              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="user"
                  placeHolder="Nome completo"
                  value={updatedData.title}
                  onChangeText={(text) =>
                    setUpdatedData({ ...updatedData, title: text })
                  }
                />
              </View>

              {/* Input para o email */}
              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="envelope"
                  placeHolder="E-mail"
                  value={updatedData.username}
                  onChangeText={(text) =>
                    setUpdatedData({ ...updatedData, username: text })
                  }
                />
              </View>

              {/* Input para data de nascimento */}
              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="calendar"
                  placeholder="Data de Nascimento"
                  value={dob}
                  onChangeText={handleDobChange}
                  keyboardType="numeric"
                  maxLength={10} // Limita o número de caracteres no formato dd/mm/yyyy
                />
              </View>

              {/* Botões */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setVisibleModalEdit(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
