import React from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { RadioButton, Title } from "react-native-paper";

import { buttons, StorageTypes } from "./consts";

type Props = {
  styles: Record<string, ViewStyle | TextStyle>;
  onValueChange: (value: StorageTypes) => void;
  value: StorageTypes;
};

const isChecked = (value: string, type: StorageTypes) =>
  value === type ? "checked" : "unchecked";

export function RadioButtons(props: Props) {
  const { styles, onValueChange, value: selectedButton } = props;

  return (
    <View style={styles.radioContainer}>
      <Title style={styles.title}>
        Select type of storage and action to test
      </Title>
      <RadioButton.Group
        onValueChange={(v) => onValueChange(v as StorageTypes)}
        value={selectedButton}
      >
        {buttons.map(({ label, value }, key) => (
          <RadioButton.Item
            {...{ key, label, value }}
            status={isChecked(selectedButton, value)}
          />
        ))}
      </RadioButton.Group>
    </View>
  );
}
