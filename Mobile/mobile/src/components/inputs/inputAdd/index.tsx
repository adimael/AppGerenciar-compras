import { TextInput, TextInputProps, View } from "react-native";
import styles from "./styles";
import Icon from "react-native-vector-icons/FontAwesome";

type InputProps = TextInputProps & {
  iconName: string;
  placeHolder?: string;
  defaultValue?: string;
};

export default function InputAdd({
  iconName,
  placeHolder,
  defaultValue,
  ...rest
}: InputProps) {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={20} color="#684AE8" style={styles.icon} />
      <TextInput
        style={styles.inputText}
        defaultValue={defaultValue}
        placeholder={placeHolder}
        {...rest}
      />
    </View>
  );
}
