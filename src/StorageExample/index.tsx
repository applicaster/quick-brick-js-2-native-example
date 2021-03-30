import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, View } from "react-native";

type FormProps = {
  submitMessage: string;
  initialValues: Record<string, string>;
  title: string;
};

import { StorageForm } from "./Form";
import { ErrorBox } from "./ErrorBox";
import { RadioButtons } from "./RadioButtons";
import { ResultBox } from "./ResultBox";
import { buttons, StorageTypes } from "./consts";

import JS2Native from "@applicaster/quick-brick-js-2-native";

const stringifyIfNeeded = (val: any): string => {
  if (typeof val === "string") return val;
  return JSON.stringify(val);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    margin: 8,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    margin: 12,
    paddingVertical: 12,
  },
  box: {
    width: "100%",
    padding: 12,
    alignItems: "center",
  },
  input: {
    alignSelf: "stretch",
  },
  radioContainer: {
    width: "100%",
  },
  radio: {
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "red",
  },
});

const getProps = {
  submitMessage: "Get item in storage",
  initialValues: { key: "", namespace: "" },
  title: "Get item in Storage",
};

const setProps = {
  submitMessage: "Set item in storage",
  initialValues: { key: "", namespace: "", value: "" },
  title: "Set item in Storage",
};

function getFormProps(formType: StorageTypes) {
  const title = buttons.find(({ value }) => value === formType)
    ?.label as string;

  if (formType.includes("get")) {
    return { ...getProps, title };
  } else {
    return { ...setProps, title };
  }
}

const bridge = JS2Native() || {};

export function StorageExample() {
  const [formType, setFormType] = useState<StorageTypes>(
    "sessionStorage.getItem"
  );

  const [key, setKey] = useState<string>("");
  const [namespace, setNamespace] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formProps, setFormProps] = useState<FormProps>(getProps);

  const clearValues = () => {
    setValue("");
    setErrorMessage("");
  };

  const onSubmit = useCallback(
    async (values) => {
      if (!values.key) {
        setValue("");
        setErrorMessage("Key is required");

        return;
      }

      if (formType.includes("setItem") && !values.value) {
        setValue("");
        setErrorMessage("value is required");

        return;
      }

      setErrorMessage("");

      try {
        const [storage, method] = formType.split(".");

        const args = [values.key, values.namespace || undefined];

        if (method.includes("set")) {
          args.splice(1, 0, values.value);
        }

        // @ts-ignore
        const _result = await bridge?.[storage]?.[method]?.apply?.(null, args);

        setKey(values.key);
        setNamespace(values.namespace);
        setValue(stringifyIfNeeded(_result));
      } catch (e) {
        setValue("");
        setErrorMessage(e.message);
      }
    },
    [formType]
  );

  useEffect(() => {
    clearValues();
    setFormProps(getFormProps(formType));
  }, [formType]);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <RadioButtons
          styles={styles}
          onValueChange={setFormType}
          value={formType}
        />

        <StorageForm styles={styles} onSubmit={onSubmit} {...formProps} />
        <ErrorBox errorMessage={errorMessage} styles={styles} />

        <ResultBox
          storageKey={key}
          namespace={namespace}
          formType={formType}
          value={value}
        />
      </ScrollView>
    </View>
  );
}
