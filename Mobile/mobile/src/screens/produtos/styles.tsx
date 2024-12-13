import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    margin: 5,
  },
  logo: {
    width: 150, // ajuste conforme o necessário
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    resizeMode: "contain",
    borderRadius: 100, // Metade da largura/altura para fazer o círculo
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000", // cor preta para o título
    marginBottom: 20,
    marginTop: -20,
  },
  textP: {
    fontSize: 18,
    color: "#684AE8",
    textAlign: "center", // centralizar o texto
    marginBottom: 50,
    margin: -40,
    fontWeight: "bold",
  },
  viewText: {
    marginBottom: 30,
    alignItems: "center",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoutButton: {
    position: "absolute",
    top: 60,
    right: 300,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 60,
  },
});

export default styles;
