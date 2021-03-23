import React from "react";
import { Text } from "react-native-paper";

type Props = {
  value: string;
  storageKey: string;
  namespace: string;
  formType: "get" | "set";
};

export function ResultBox({ value, formType, storageKey, namespace }: Props) {
  if (formType === "set" && value) {
    return (
      <Text>
        Result successfully set in storage for key {storageKey}{" "}
        {namespace && `and namespace: ${namespace}`}
      </Text>
    );
  }

  if (formType === "get" && value) {
    return (
      <>
        <Text>
          key: {namespace ? `${namespace}:${storageKey}` : storageKey}
        </Text>
        <Text>value: {value}</Text>
      </>
    );
  }

  return null;
}
