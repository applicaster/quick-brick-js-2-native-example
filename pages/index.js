import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  BottomNavigation,
} from "react-native-paper";

import dynamic from "next/dynamic";
import Headers from "../src/Headers";

const HooksExample = dynamic(() => import("../src/HooksExample"), {
  ssr: false,
});
const StorageExample = dynamic(() => import("../src/StorageExample"), {
  ssr: false,
});

export default function Home(props) {
  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    { key: "headers", title: "Headers", icon: "web", props },
    { key: "hooks", title: "Hooks", icon: "webhook" },
    { key: "storage", title: "Storage", icon: "database" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    headers: Headers,
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

Home.getInitialProps = async (ctx) => {
  return { foo: "bar", headers: ctx.req.headers };
};
