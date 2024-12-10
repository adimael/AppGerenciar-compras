import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  logo: {
    width: 150, // ajuste conforme o necessário
    height: 150,
    marginBottom: 20,
    resizeMode: "contain",
    borderRadius: 100, // Metade da largura/altura para fazer o círculo
  },
  textTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#684AE8", // cor preta para o título
    marginBottom: 10,
  },
  textP: {
    fontSize: 18,
    color: "#684AE8", // cor preta para o texto
    textAlign: "center", // centralizar o texto
    marginBottom: 20,
  },
  viewText: {
    marginBottom: 30,
    alignItems: "center",
  },
});

export default styles;
