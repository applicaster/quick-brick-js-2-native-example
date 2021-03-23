import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

type Props = {
  errorMessage: string;
  styles: Record<string, ViewStyle | TextStyle>;
};

export function ErrorBox({ errorMessage, styles }: Props) {
  if (!errorMessage) {
    return null;
  }

  return <Text style={styles.error}>{errorMessage}</Text>;
}
