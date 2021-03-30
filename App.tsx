import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  BottomNavigation,
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
    <View style={styles.container}>
      <PaperProvider theme={DefaultTheme}>
        <BottomNavigation
          renderScene={renderScene}
          onIndexChange={setIndex}
          navigationState={{ index, routes }}
        />
      </PaperProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
