import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { RadioButton, Title } from "react-native-paper";

type Props = {
  styles: Record<string, ViewStyle | TextStyle>;
  onValueChange: (value: "get" | "set") => void;
  value: "get" | "set";
};

export function RadioButtons(props: Props) {
  const { styles, onValueChange, value } = props;

  return (
    <View style={styles.radioContainer}>
      <Title style={styles.title}>
        Do you want to set or get a value from storage ?
      </Title>
      <RadioButton.Group
        onValueChange={(v) => onValueChange(v as "get" | "set")}
        value={value}
      >
        <RadioButton.Item
          label="Get"
          value="get"
          status={value === "get" ? "checked" : "unchecked"}
        />

        <RadioButton.Item
          label="Set"
          value="set"
          status={value === "set" ? "checked" : "unchecked"}
        />
      </RadioButton.Group>
    </View>
  );
}
