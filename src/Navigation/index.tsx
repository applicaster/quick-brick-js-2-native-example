import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Surface, TextInput, Title } from "react-native-paper";

import JS2Native from "@applicaster/quick-brick-js-2-native";

const { navigation } = JS2Native() || {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    margin: 8,
    alignSelf: "stretch"
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    margin: 12,
    paddingBottom: 12
  },
  buttonContainer: {
    width: "100%"
  },
  button: {
    margin: 12,
    padding: 12
  },
  textInput: {
    margin: 12,
    padding: 12
  }
});

export default function NavigationExample() {
  const [url, setUrl] = useState<string>();

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Navigate to Url Scheme</Title>
      <Surface style={styles.buttonContainer}>
        <TextInput
          style={styles.textInput}
          value={url}
          onChangeText={(e) => setUrl(e)}
          placeholder={"type url scheme"}
        />
        <Button
          style={styles.button}
          disabled={!url}
          onPress={() => {
            url && navigation.openUrlScheme(url);
          }}
        >
          Open URL Scheme
        </Button>
      </Surface>
    </View>
  );
}
