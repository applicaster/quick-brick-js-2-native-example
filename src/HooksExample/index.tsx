import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Surface, Title } from "react-native-paper";

import JS2Native from "../JS2Native";

import { HookButton } from "./HookButton";

const { screenHook } = JS2Native() || {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    margin: 8,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    margin: 12,
    paddingBottom: 12,
  },
  buttonContainer: {
    width: "100%",
  },
  button: {
    margin: 12,
    padding: 12,
  },
});

const buttons = [
  { title: "Succes", success: true, payload: {}, icon: "check" },
  { title: "Cancel", success: false, payload: {} },
  {
    title: "Error",
    success: false,
    payload: {},
    error: new Error("hooks failed"),
  },
];

export function HooksExample() {
  const [hooksEnabled, setHooksEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (screenHook?.data?.payload) {
      setHooksEnabled(true);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <ActivityIndicator size="large" />;
  }

  if (!hooksEnabled) {
    return (
      <View>
        <Title>No hooks</Title>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Testing Hooks</Title>
      <Surface style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <HookButton key={index} style={styles.button} {...button} />
        ))}
      </Surface>
    </View>
  );
}
