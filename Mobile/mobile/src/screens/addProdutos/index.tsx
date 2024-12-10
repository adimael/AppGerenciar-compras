import { Image, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import ButtonCircle from "../../components/buttons/buttonCircle";
import InputAdd from "../../components/inputs/inputAdd";
import Button from "../../components/buttons/button";

type AddProdutosParamsList = NativeStackNavigationProp<
  RoutesParams,
  "AddProdutos"
>;

export default function AddProdutosScreen() {
  const navigation = useNavigation<AddProdutosParamsList>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={[styles.logo, { tintColor: "#684AE8" }]}
      />
      <Text style={styles.textP}>Produtos.com</Text>
      <Text style={styles.textTitle}>Novo Produto</Text>

      {/* Botão de Voltar */}
      <View style={styles.row}>
        <ButtonCircle
          className="return"
          iconName="arrow-left"
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Inputs */}
      <View style={styles.inputContainer}>
        <InputAdd
          iconName="tag"
          placeHolder="Nome do Produto"
          defaultValue=""
        />
        <InputAdd
          iconName="align-left"
          placeHolder="Descrição"
          defaultValue=""
        />
        <InputAdd
          iconName="dollar"
          placeHolder="Preço (R$)"
          defaultValue=""
          keyboardType="numeric"
        />
      </View>

      {/* Botões */}
      <View style={styles.buttonRow}>
        <Button
          title="Cancelar"
          className="cancel"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Salvar"
          className="alterar"
          onPress={() => {
            // Lógica para salvar o produto
            console.log("Produto salvo!");
          }}
        />
      </View>
    </View>
  );
}
