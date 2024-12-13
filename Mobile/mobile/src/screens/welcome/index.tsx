import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RoutesParams } from "../../navigation/routesParams";
import Button from "../../components/buttons/button";

type WelcomeParamsList = NativeStackNavigationProp<RoutesParams, "Welcome">;

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeParamsList>();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/logo.png")}
        style={[styles.logo, { tintColor: "#684AE8" }]}
      />
      <View style={styles.viewText}>
        <Text style={styles.textTitle}>Compras.com</Text>
        <Text style={styles.textP}>Gerencie sua loja online</Text>
      </View>

      <Button
        title="Entrar"
        className="loading"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
