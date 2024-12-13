import { Alert, Image, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import ButtonCircle from "../../components/buttons/buttonCircle";
import InputAdd from "../../components/inputs/inputAdd";
import Button from "../../components/buttons/button";
import { useState } from "react";
import { useClient } from "../../context/Client";
import axios from "axios";

type AddClientParamsList = NativeStackNavigationProp<RoutesParams, "AddClient">;

const API_URL = "http://localhost:3001";

export default function AddClientScreen() {
  const navigation = useNavigation<AddClientParamsList>();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");

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
  //Adicionar Cliente

  const handleSave = async () => {
    if (!nome || !email || !dob) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/clientes/`, {
        name: nome,
        email,
        data_nascimento: dob,
      });
      Alert.alert("Sucesso", "Cliente adicionado com sucesso!");
      setNome("");
      setEmail("");
      setDob("");
      navigation.navigate("Home", { newClient: response.data });
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      Alert.alert("Erro", "Não foi possível adicionar o cliente.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={[styles.logo, { tintColor: "#684AE8" }]}
      />
      <Text style={styles.textP}>Compras.com</Text>
      <Text style={styles.textTitle}>Novo cliente</Text>

      <View style={styles.row}>
        <ButtonCircle
          className="return"
          iconName="arrow-left"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.inputContainer}>
        <InputAdd
          iconName="user"
          placeHolder="Nome"
          defaultValue=""
          value={nome}
          onChangeText={setNome}
        />
        <InputAdd
          iconName="envelope"
          placeHolder="E-mail"
          defaultValue=""
          value={email}
          onChangeText={setEmail}
        />
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
        <Button
          title="Cancelar"
          className="cancel"
          onPress={() => navigation.goBack()}
        />
        <Button title="Salvar" className="alterar" onPress={handleSave} />
      </View>
    </View>
  );
}
