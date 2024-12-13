import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    margin: 5,
    marginTop: 40,
  },
  logo: {
    width: 120, // ajuste conforme o necessário
    height: 120,
    marginBottom: 10,
    resizeMode: "contain",
  },
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  textP: {
    fontSize: 18,
    color: "#684AE8",
    textAlign: "center", // centralizar o texto
    marginBottom: 50,
    margin: -40,
    fontWeight: "bold",
  },
  buttonRow: {
    marginRight: 100,
    marginLeft: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  inputContainer: {
    width: "90%", // Ajusta a largura
    justifyContent: "center",
    marginVertical: 20, // Espaço entre os inputs
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default styles;
