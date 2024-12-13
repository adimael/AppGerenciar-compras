import React, { useState } from "react";
import { Text, View, Button, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import ButtonCircle from "../../buttons/buttonCircle";
import InputAdd from "../../inputs/inputAdd";

type Data = {
  id: string;
  itemName: string;
  quantity: string;
  total: string;
  createdAt: string;
};

type CardComprasProps = {
  data: Data;
};

export default function CardCompras({ data }: CardComprasProps) {
  const [visibleModalDel, setVisibleModalDel] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);

  // Função para abrir a modal
  const handleOpenModal = () => {
    setVisibleModalDel(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.itemName}</Text>
        <Text style={styles.subtitle}>Quantidade: {data.quantity}</Text>
        <Text style={styles.subtitleQuant}>Total: R$ {data.total}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Editar"
            className="editPerfil"
            onPress={() => setVisibleModalEdit(true)}
            color="#7104FF"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Excluir"
            className="delete"
            onPress={handleOpenModal}
            color="#F44336"
          />
        </View>

        {/* Modal de exclusão */}
        <Modal
          visible={visibleModalDel}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setVisibleModalDel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 25,
                  marginRight: 178,
                }}
              >
                <ButtonCircle
                  className="return"
                  iconName="arrow-left"
                  onPress={() => setVisibleModalDel(false)}
                />
                <Text style={styles.modalTitle}>Inativar Compra</Text>
              </View>
              <Text style={styles.textDel}>
                Tem certeza que deseja inativar esta compra?
              </Text>
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
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de edição */}
        <Modal
          visible={visibleModalEdit}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setVisibleModalEdit(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  margin: 30,
                  marginRight: 176,
                }}
              >
                <ButtonCircle
                  className="return"
                  iconName="arrow-left"
                  onPress={() => setVisibleModalEdit(false)}
                />
                <Text style={styles.modalTitle}>Editar Compra</Text>
              </View>
              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="shopping-bag"
                  placeHolder="Nome do Produto"
                  defaultValue={data.itemName}
                />
              </View>
              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="hashtag"
                  placeHolder="Quantidade"
                  defaultValue={data.quantity}
                />
              </View>
              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="dollar"
                  placeHolder="Total"
                  defaultValue={data.total}
                />
              </View>
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setVisibleModalEdit(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => setVisibleModalEdit(false)}
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
