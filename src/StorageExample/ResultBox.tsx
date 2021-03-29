import React from "react";
import { Text } from "react-native-paper";
import { StorageTypes } from "./consts";

type Props = {
  value: string;
  storageKey: string;
  namespace: string;
  formType: StorageTypes;
};

export function ResultBox({ value, formType, storageKey, namespace }: Props) {
  if (formType.includes("set") && value) {
    return (
      <Text>
        Result successfully set in storage for key {storageKey}{" "}
        {namespace && `and namespace: ${namespace}`}
      </Text>
    );
  }

  if (formType.includes("get") && value) {
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
