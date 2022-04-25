import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { Button, Surface, TextInput, Title } from "react-native-paper";

import JS2Native from "@applicaster/quick-brick-js-2-native";

import { HookButton } from "./HookButton";

const { screenHook, navigation } = JS2Native() || {};

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

const buttons = [
  { title: "Success", success: true, payload: {}, icon: "check" },
  { title: "Cancel", success: false, payload: {} },
  {
    title: "Error",
    success: false,
    payload: {},
    error: new Error("hooks failed")
  },
  {
    title: "Close screen",
    success: true,
    payload: {}
  }
];

const feedUrl =
  "https://assets-production.applicaster.com/zapp/assets/accounts/5cc6f5d65d639a000cf17876/static_feeds/feed-d908a812-44df-453f-a601-3caada0b66a4.json";

export default function HooksExample() {
  const [hooksEnabled, setHooksEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [screenId, setScreenId] = useState<string>();
  const [entry, setEntry] = useState<unknown>(null);

  useEffect(() => {
    if (screenHook?.data?.payload) {
      setHooksEnabled(true);
    }
    setReady(true);
  }, []);

  const homeId = useMemo(
    () => navigation?.screens?.find(({ home }) => home)?.id,
    []
  );

  useEffect(() => {
    console.log({ navigation, JS2Native: window.Applicaster });
    fetch(feedUrl)
      .then((res) => res.json())
      .then((feed) => {
        console.log({ feed });
        const { entry } = feed;

        setEntry(entry[0]);
      });
  }, []);

  if (!ready) {
    return <ActivityIndicator size="large" />;
  }

  // if (!hooksEnabled) {
  const closeButton = buttons[buttons.length - 1];

  return (
    <View>
      <Title style={styles.title}>There are no hooks</Title>
      <Surface style={styles.buttonContainer}>
        <HookButton style={styles.button} {...closeButton} />
        <TextInput
          style={styles.textInput}
          value={screenId}
          onChangeText={(e) => setScreenId(e)}
          placeholder={"type screen id"}
        />
        <Button
          style={styles.button}
          disabled={!entry}
          onPress={() => entry && navigation?.navigateToEntry?.(entry)}
        >
          Open {entry?.title}
        </Button>
      </Surface>
    </View>
  );
  // }

  // return (
  //   <View style={styles.container}>
  //     <Title style={styles.title}>Testing Hooks</Title>
  //     <Surface style={styles.buttonContainer}>
  //       {buttons.map((button, index) => (
  //         <HookButton key={index} style={styles.button} {...button} />
  //       ))}
  //     </Surface>
  //   </View>
  // );
}
