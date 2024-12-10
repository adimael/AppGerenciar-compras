import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation } from "@react-navigation/native";
import keys from "../../components/mock/keyCompras";
import CardCompras from "../../components/cards/cardCompras";
import ButtonCircle from "../../components/buttons/buttonCircle";

type ComprasParamsList = NativeStackNavigationProp<RoutesParams, "Compras">;

type Compra = {
  id: string;
  itemName: string;
  quantity: number;
  total: string;
  createdAt: string;
};

export default function ComprasScreen() {
  const navigation = useNavigation<ComprasParamsList>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={[styles.logo, { tintColor: "#684AE8" }]}
      />
      <Text style={styles.textP}>Compras.com</Text>

      <Text style={styles.textTitle}>Lista de Compras</Text>

      <View style={styles.logoutButton}>
        <ButtonCircle
          className="logout"
          iconName="sign-out" // Ícone de perfil
          onPress={() => navigation.navigate("Welcome")} // Substitua pela navegação ou lógica desejada
        />
      </View>

      {/*Lista de compras*/}
      <FlatList
        data={keys}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CardCompras data={item} />}
      />
      <View style={styles.floatingButton}>
        <ButtonCircle
          className="addKeys"
          iconName="plus"
          onPress={() => navigation.navigate("AddCompras")}
        />
      </View>
    </View>
  );
}
