# Quick Brick JS 2 Native example

## About this repo

This repo shows how the Quick Brick JS2Native API can be used in a web page presented inside a webview screen plugin in your Quick Brick app. If your webview screen is set up as a hook, you will be able to test the hooks integration. On top of this, you will be able to test the session storage API (set and get)

This website uses the `@applicaster/quick-brick-js-2-native` package, which is the recommended way to use our JS 2 Native features. It is built in with a mock, which lets you access the API and test it even when running the web content outside of a Quick Brick app webview screen.

### requirements

- expo-cli

### Set up

- clone this repo
- run `yarn` to install dependencies
- run `expo start`
- in the expo debugger, click "run in a web browser" on the left hand side menu

this will open a browser window on the URL running the webpack dev server. note the url, you will need to add it to your webview screen configuration to test this in your Quick Brick app.

## Using JS 2 native

### Requirements

- iOS SDK 4+
- Android SDK 5+
- QB ^5.1.0
- @applicaster/quick-brick-js-2-native
- Webview screen plugin ^3.0.0
- Webview component plugin ^2.0.0

### Debugging

In your web content, you can debug using `console.log`, `console.warn` and `console.error`. These functions are polyfilled in the JS2Native bridge so that log output from your web content will be forwarded to the React Native debugger.

The polyfill doesn't support `console.info` `console.debug` or the `console.group` API.

### API

#### Hooks

When the webview presenting your web content is configured as a hook, the hooks API can give you access to the hook payload, the plugin configuration, and the hook callbacks required to tell the app what is the outcome of the hook.

the `dismissHook` function behaves exactly like the hooks callback, allows you to return a success status, modify the hook payload, and optionnaly pass an error.

```typescript
import React, { useEffect } from "react";
import { View, Button } from "react-native";
import JS2Native from "@applicaster/quick-brick-js-2-native";

/* this allows you to access the JS2Native API.
   If the web content is not running in an applicaster webview, 
   this is still safe to use, the library will return you a mock */
const { hooks } = JS2Native();

export function MyComponent(props) {
  useEffect(() => {
    console.log("hook data", hooks.data.payload);
    console.log("hook plugin", hooks.data.plugin);
  }, []);

  const onPress = () => {
    hooks.dismissHook({
      success: true,
      payload: hooks.data.payload,
    });
  };

  const onCancel = () => {
    hooks.dismissHook({
      success: false,
      payload: hooks.data.payload,
    });
  };

  const onError = () => {
    hooks.dismissHook({
      success: false,
      payload: hooks.data.payload,
      error: new Error("oups !"),
    });
  };

  return (
    <View>
      <Button title="hook success" onPress={onSuccess} />
      <Button title="hook cancel" onPress={onCancel} />
      <Button title="hook error" onPress={onError} />
    </View>
  );
}
```

#### Session Storage

The JS2Native api allows you to interact with the native app's SessionStorage capabilities. You can get and set values in session storage.

When running the web content outside of a Quick Brick webview screen, the `@applicaster/quick-brick-js-2-native` library will expose a mock mimicking interaction with the native storage, and relying on the web session storage API.

```typescript
import React, { useEffect } from "react";
import JS2Native from "@applicaster/quick-brick-js-2-native";

const { sessionStorage } = JS2Native();

export function MyComponent(props) {
  const signIn = async () => {
    const appName = await sessionStorage.getItem("app_name");
    const token = await requestTokenForApp(appName);

    try {
      const result = await sessionStorage.setItem(
        "token",
        token,
        "my_namespace"
      );

      if (!result) {
        throw new Error("couldn't set token");
      }
    } catch (e) {
      // handle errors
    }
  };

  useEffect(() => {
    signIn();
  }, []);

  return <View>{/* ... */}</View>;
}
```
