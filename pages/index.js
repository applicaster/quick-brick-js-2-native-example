import React from "react";
import { StyleSheet } from "react-native";

import dynamic from "next/dynamic";

const Router = dynamic(() => import("../src/Router"), {
  ssr: false
});

export default function Home(props) {
  return <Router {...props} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

Home.getInitialProps = async (ctx) => {
  return { foo: "bar", headers: ctx.req.headers };
};
