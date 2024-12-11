import { FlatList, Image, Text, View } from "react-native";
import styles from "./styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import { useNavigation, useRoute } from "@react-navigation/native";
import keys from "../../components/mock/key";
import Card from "../../components/cards/card";
import ButtonCircle from "../../components/buttons/buttonCircle";
import { useState, useEffect } from "react";

type HomeParamsList = NativeStackNavigationProp<RoutesParams, "Home">;

type Data = {
  id: string;
  title: string;
  username: string;
  createdAt: string;
  data_nascimento: string;
};

export default function HomeScreen({ route }: HomeProps) {
  const navigation = useNavigation<HomeParamsList>();
  const newClient = route.params?.newClient;

  // Mover os dados para o estado
  const [clients, setClients] = useState<Data[]>(keys);

  useEffect(() => {
    if (newClient) {
      console.log("Novo cliente adicionado:", newClient);
      const newClient = route.params.newClient as Data;
    }
  }, [newClient]);

  // Função para adicionar um novo cliente
  const addClient = (newClient: Data) => {
    setClients((prevClients) => [...prevClients, newClient]);
  };

  // Função para atualizar um cliente
  const handleUpdateClient = (updatedClient: Data) => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={[styles.logo, { tintColor: "#684AE8" }]}
      />
      <Text style={styles.textP}>Compras.com</Text>

      <Text style={styles.textTitle}>Lista de Clientes</Text>

      <View style={styles.logoutButton}>
        <ButtonCircle
          className="logout"
          iconName="sign-out" // Ícone de perfil
          onPress={() => navigation.navigate("Welcome")} // Substitua pela navegação ou lógica desejada
        />
      </View>

      {/*Lista de clientes*/}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card data={item} onUpdateClient={handleUpdateClient} />
        )}
      />
      <View style={styles.floatingButton}>
        <ButtonCircle
          className="addKeys"
          iconName="plus"
          onPress={() => navigation.navigate("AddClient")}
        />
      </View>
    </View>
  );
}
