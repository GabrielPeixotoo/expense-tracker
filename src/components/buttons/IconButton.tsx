import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

type IoniconsName = ComponentProps<typeof Ionicons>["name"];

type IconButtonProps = {
  icon: IoniconsName;
  onPress: () => void;
  size?: number;
  color?: string;
};

export default function IconButton({
  icon,
  onPress,
  size = 24,
  color = "black",
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  pressed: {
    opacity: 0.75,
  },
});
