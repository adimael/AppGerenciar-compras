import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

type StyleKeys = "return" | "addKeys" | "logout";

type ButtonProps = TouchableOpacityProps & {
  iconName?: string;
  className: StyleKeys;
};

export default function ButtonCircle({
  iconName,
  className,
  ...rest
}: ButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles[className]]} {...rest}>
        <Icon name={iconName || ""} size={20} color={"#E6ECF8"} />
      </TouchableOpacity>
    </View>
  );
}
