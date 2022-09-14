import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  BottomNavigation
} from "react-native-paper";

import Headers from "./Headers";
import HooksExample from "./HooksExample";
import StorageExample from "./StorageExample";

import JS2Native from "@applicaster/quick-brick-js-2-native";
import NavigationExample from "./Navigation";

type Props = {
  foo: string;
  header: unknown;
};

export default function Router(props: Props) {
  const { safeAreaInsets } = JS2Native();
  console.log({ safeAreaInsets });

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    { key: "headers", title: "Headers", icon: "web", props },
    { key: "hooks", title: "Hooks", icon: "webhook" },
    { key: "storage", title: "Storage", icon: "database" },
    { key: "navigation", title: "Navigation", icon: "web" }
  ]);

  const renderScene = BottomNavigation.SceneMap({
    // @ts-ignore
    headers: Headers,
    hooks: HooksExample,
    storage: StorageExample,
    navigation: NavigationExample
  });

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets?.top || 0 }]}>
      <PaperProvider theme={DefaultTheme}>
        <BottomNavigation
          renderScene={renderScene}
          onIndexChange={setIndex}
          navigationState={{ index, routes }}
          safeAreaInsets={safeAreaInsets}
        />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
