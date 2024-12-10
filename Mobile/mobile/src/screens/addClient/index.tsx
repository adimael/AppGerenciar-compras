import { Image, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import ButtonCircle from "../../components/buttons/buttonCircle";
import InputAdd from "../../components/inputs/inputAdd";
import Button from "../../components/buttons/button";

type AddClientParamsList = NativeStackNavigationProp<RoutesParams, "AddClient">;

export default function AddClientScreen() {
  const navigation = useNavigation<AddClientParamsList>();

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
        <InputAdd iconName="user" placeHolder="Nome" defaultValue="" />
        <InputAdd iconName="envelope" placeHolder="E-mail" defaultValue="" />
        <InputAdd
          iconName="calendar"
          placeHolder="Data de Nascimento"
          defaultValue=""
        />
      </View>

      {/* Botões */}
      <View style={styles.buttonRow}>
        <Button
          title="Cancelar"
          className="cancel"
          onPress={() => navigation.goBack()}
        />
        <Button title="Salvar" className="alterar" />
      </View>
    </View>
  );
}
