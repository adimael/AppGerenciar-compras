import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import keys from "../../components/mock/keyProdutos";
import Card from "../../components/cards/cardProdutos";
import ButtonCircle from "../../components/buttons/buttonCircle";

type ProdutosParamsList = NativeStackNavigationProp<RoutesParams, "Produtos">;

type Data = {
  id: string;
  name: string;
  description: string;
  price: string;
  createdAt: string;
};

export default function ProdutosScreen() {
  const navigation = useNavigation<ProdutosParamsList>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={[styles.logo, { tintColor: "#684AE8" }]}
      />
      <Text style={styles.textP}>Compras.com</Text>

      <Text style={styles.textTitle}>Lista de Produtos</Text>

      <View style={styles.logoutButton}>
        <ButtonCircle
          className="logout"
          iconName="sign-out" // Ícone de perfil
          onPress={() => navigation.navigate("Welcome")} // Substitua pela navegação ou lógica desejada
        />
      </View>

      {/*Lista de clientes*/}
      <FlatList
        data={keys}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Card data={item} />}
      />

      <View style={styles.floatingButton}>
        <ButtonCircle
          className="addKeys"
          iconName="plus"
          onPress={() => navigation.navigate("AddProdutos")}
        />
      </View>
    </View>
  );
}
