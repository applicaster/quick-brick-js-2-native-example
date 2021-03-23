import React from "react";
import { ViewStyle } from "react-native";
import { Button } from "react-native-paper";

import JS2Native from "@applicaster/quick-brick-js-2-native";

type Props = {
  title: string;
  success: boolean;
  payload: any;
  error?: Error;
  style: ViewStyle;
};

const { hooks } = JS2Native();

export function HookButton(props: Props) {
  const { title, success, payload, error, style } = props;

  const onPress = () => {
    hooks.dismissHook({ success, payload, error });
  };

  return (
    <Button style={style} mode="contained" onPress={onPress}>
      {title}
    </Button>
  );
}
