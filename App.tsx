import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  BottomNavigation,
  Text,
} from "react-native-paper";

import { HooksExample } from "./src/HooksExample";
import { StorageExample } from "./src/StorageExample";

export default function App() {
  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    { key: "hooks", title: "Hooks", icon: "webhook" },
    { key: "storage", title: "Storage", icon: "database" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    hooks: HooksExample,
    storage: StorageExample,
  });

  return (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <BottomNavigation
          renderScene={renderScene}
          onIndexChange={setIndex}
          navigationState={{ index, routes }}
        />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
});
