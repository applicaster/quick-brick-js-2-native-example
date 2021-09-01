import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Surface, Title } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 24,
    margin: 8,
    alignSelf: "stretch",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    margin: 12,
    paddingBottom: 12,
  },
  header: {
    fontSize: 13,
    margin: 12,
    paddingBottom: 12,
  },
  token: { margin: 12, fontFamily: "monospace" },
  surfaceContainer: {
    width: "100%",
  },
});

type Props = {
  route: {
    props: {
      headers: object;
    };
  };
};

export default function Headers(props: Props) {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Headers</Title>

      <Surface style={styles.surfaceContainer}>
        <Text style={styles.token}>
          {JSON.stringify(props?.route?.props.headers, null, 2)}
        </Text>
      </Surface>
    </View>
  );
}
