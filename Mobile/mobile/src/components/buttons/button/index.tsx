import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

type StyleKeys =
  | "return"
  | "loading"
  | "cancel"
  | "save"
  | "alterar"
  | "delete"
  | "editarPerf"
  | "editClient"
  | "editCompras"
  | "editProdutos";

type ButtonProps = TouchableOpacityProps & {
  title?: string;
  className: StyleKeys;
};

export default function Button({ title, className, ...rest }: ButtonProps) {
  let styleText;

  if (className === "return") {
    styleText = { ...styles.return };
  } else if (className === "delete") {
    styleText = { ...styles.deleteButtonText };
  } else if (className === "cancel") {
    styleText = { ...styles.textCancel };
  } else {
    styleText = { ...styles.buttonText };
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles[className], styles.button]} {...rest}>
        <Text style={styleText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
