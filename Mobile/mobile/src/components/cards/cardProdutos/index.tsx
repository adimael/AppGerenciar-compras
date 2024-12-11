import React, { useState } from "react";
import { Text, View, Button, Modal, TouchableOpacity } from "react-native";
import styles from "./styles";
import ButtonCircle from "../../buttons/buttonCircle";
import InputAdd from "../../inputs/inputAdd";

type Data = {
  id: StringConstructor;
  name: string;
  description: string;
  price: string;
  createdAt: string;
};

type CardProdutosProps = {
  data: Data;
};

export default function CardProdutos({ data }: CardProdutosProps) {
  const [visibleModalDel, setVisibleModalDel] = useState(false);
  const [visibleModalEdit, setVisibleModalEdit] = useState(false);

  // Função para abrir a modal
  const handleOpenModal = () => {
    setVisibleModalDel(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.price}>Preço: R$ {data.price}</Text>
        <Text style={styles.dob}>
          {new Date(data.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Editar"
            className="editProdutos"
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

        {/* Modal excluir produtos */}
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
                <Text style={styles.modalTitle}>Excluir produtos</Text>
              </View>

              <Text style={styles.textDel}>
                Tem certeza que deseja excluir este produto?
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
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal editar produto */}
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
                  margin: 20,
                  marginRight: 160,
                }}
              >
                <ButtonCircle
                  className="return"
                  iconName="arrow-left"
                  onPress={() => setVisibleModalEdit(false)} // Fecha a modal ao pressionar o ícone de voltar
                />
                <Text style={styles.modalTitle}>Editar produtos</Text>
              </View>

              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="tag"
                  placeHolder="Nome do produto"
                  defaultValue={data.name}
                />
              </View>

              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="align-left"
                  placeHolder="Descrição do produto"
                  defaultValue={data.description}
                />
              </View>

              <View style={styles.inputContainer}>
                <InputAdd
                  iconName="dollar"
                  placeHolder="Preço do produto"
                  keyboardType="numeric"
                  defaultValue={data.price}
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
