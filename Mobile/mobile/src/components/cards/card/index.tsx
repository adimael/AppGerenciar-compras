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
};

type CardProps = {
  data: Data;
  onUpdateClient: (updatedClient: Data) => void;
};

export default function Card({ data, onUpdateClient }: CardProps) {
  const { editClient } = useClient();
  const [visibleModalDel, setVisibleModalDel] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);
  const [dob, setDob] = useState("");
  const [updatedData, setUpdatedData] = useState(data); // Estado para editar os dados

  // Função para salvar as alterações
  const handleSave = () => {
    onUpdateClient(updatedData); // Envia os dados atualizados para o pai
    setVisibleModalEdit(false); // Fecha a modal
  };

  const handleDobChange = (input: string) => {
    // Remove caracteres que não são números
    const numericInput = input.replace(/\D/g, "");

    // Adiciona as barras para formatação
    let formattedInput = numericInput;
    if (numericInput.length > 2) {
      formattedInput = `${numericInput.slice(0, 2)}/${numericInput.slice(2)}`;
    }
    if (numericInput.length > 4) {
      formattedInput = `${numericInput.slice(0, 2)}/${numericInput.slice(
        2,
        4
      )}/${numericInput.slice(4, 8)}`;
    }

    // Atualiza o estado com o valor formatado
    setDob(formattedInput);
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
        <Text style={styles.dob}>
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
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
                  onPress={() => setVisibleModalDel(false)}
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
                  onPress={async () => {
                    try {
                      await editClient(data.id, {
                        nome: updatedData.title,
                        email: updatedData.username,
                        data_nascimento: dob,
                      });
                      handleSave();
                    } catch (error) {
                      console.error("Erro ao editar cliente: ", error);
                    }
                  }}
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
