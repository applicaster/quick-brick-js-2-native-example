import React from "react";
import { ViewStyle } from "react-native";
import { Button } from "react-native-paper";

// @ts-ignore
import JS2Native from "@applicaster/quick-brick-js-2-native";

type Props = {
  title: string;
  success: boolean;
  payload: any;
  error?: Error;
  style: ViewStyle;
};

const { screenHook } = JS2Native() || {};

export function HookButton(props: Props) {
  const { title, success, payload, error, style } = props;

  const onPress = () => {
    screenHook?.callback({ success, payload, error });
  };

  return (
    <Button style={style} mode="contained" onPress={onPress}>
      {title}
    </Button>
  );
}
