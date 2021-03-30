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

---

title: JS to Native Bridge
sidebar_label: JS2Native
heading: Integrations

---

The JS2Native api allows to leverage some of the native app's APIs when building web content running inside a webview. this page explains how to use the `@applicaster/quick-brick-js-2-native` package from the Quick Brick framework, to build web content using this bridge

## Using JS 2 native

### Requirements

- iOS SDK 4+
- Android SDK 5+
- QB ^5.1.0
- @applicaster/quick-brick-js-2-native
- Webview screen plugin ^3.0.0
- Webview component plugin ^2.0.0

### Installing this library

Simply install the package via npm or yarn:

`$ yarn add @applicaster/quick-brick-js-2-native`

or

`$ npm install @applicaster/quick-brick-js-2-native --save`

you can then import the library using `import` or `require` syntax

```javascript
import JS2Native from "@applicaster/quick-brick-js-2-native";

// or

var JS2Native = require("@applicaster/quick-brick-js-2-native");
```

### Debugging

In your web content, you can debug using `console.log`, `console.warn` and `console.error`. These functions are polyfilled in the JS2Native bridge so that log output from your web content will be forwarded to the React Native debugger. the original call to the console module is preserved, so if you prefer to debug your web content in the webview using features like `chrome://inspect` you can still do it.

The polyfill doesn't support `console.info` `console.debug` or the `console.group` API.

### API

Once the module is installed in your project, you can import it in any file and start to interact with the bridge.

```javascript
import JS2Native from "@applicaster/quick-brick-js-2-native";

/* this allows you to access the JS2Native API.
   If the web content is not running in an applicaster webview,
   this is still safe to use, the library will return you a mock */
const bridge = JS2Native();
// start using the bridge
```

In order to allow native to JS communication, the features of the bridge are attached to the `window` object under `window.Applicaster.JS2Native`. For convenience, the `JS2Native` function exported from the `@applicaster/quick-brick-js-2-native` package will allow you to access the bridge module directly, and provide you with mocked features when running in a browser, where the bridge features wouldn't be declared. If you directly access the bridge using `window.Applicaster.JS2Native` the bridge feature won't work properly unless you are running the web content in a webview of your app.

#### Screen Hooks

The bridge allows you to intregrate with our [hooks](./plugin-development/30-guides/50-plugins/30-hooks.md) API. See the reference to understand what are screen hooks, and how they can be used to create login plugins, and more.

```javascript
const { screenHook } = JS2Native();
```

##### properties

- `screenHook.data`:
  - `screenHook.data.payload`: contains the payload which triggered the hook execution. It is usually the feed entry on the cell which was pressed before the hook was opened.
  - `screenHook.data.plugin`: contains information about the screen hook plugin

##### methods

- `screenHook.callback: (object) => void`: allows you to notify the app that the execution of the hook is done, and specify what the outcome is. This function takes an object as argument with several properties:
  - `object.success: boolean`: flag which indicates if the hook execution was succesfull or not
  - `object.payload: Object`: if you need to mutate the payload - i.e. add a signed token to a stream url, add `extensions` properties, etc - you can assign the data in this property
  - `object.error: Error`: if the hook execution had an error, you can pass an `Error` object providing the reason of the failure.

#### Session Storage

The bridge allows you to integrate with our [session storage](./plugin-development/30-guides/70-quick-brick-apis/35-storage.md) API. The functions below are essentially proxies to the underlying storage API

```javascript
const { sessionStorage } = JS2Native();
```

The sessionStorage functions return promises, and can be used either with a `.then` callback, or the `async / await` syntax.

##### methods

- `sessionStorage.getItem: (key: string, namespace?: string) => Promise<any>`: Retrieves the value for a specific key and optional namespace from session storage.
- `sessionStorage.setItem: (key: string, value: any, namespace?: string) => Promise<boolean>`: Sets a value for a specific key and optional namespace in session storage. Returns a promise with a boolean indicating wether the action was succesful or not.

#### Local Storage

The bridge allows you to integrate with our [local storage](./plugin-development/30-guides/70-quick-brick-apis/35-storage.md) API. The functions below are essentially proxies to the underlying storage API.

```javascript
const { localStorage } = JS2Native();
```

The localStorage functions return promises, and can be used either with a `.then` callback, or the `async / await` syntax.

##### methods

- `localStorage.getItem: (key: string, namespace?: string) => Promise<any>`: Retrieves the value for a specific key and optional namespace from local storage.
- `localStorage.setItem: (key: string, value: any, namespace?: string) => Promise<boolean>`: Sets a value for a specific key and optional namespace in local storage. Returns a promise with a boolean indicating wether the action was succesful or not.
- `localStorage.getSecuredItem: (key: string, namespace?: string) => Promise<any>`: Retrieves the value for a specific key and optional namespace from local storage. This is secure storage leveraging the native keychain / secure capability
- `localStorage.setSecuredItem: (key: string, value: any, namespace?: string) => Promise<boolean>`: Sets a value for a specific key and optional namespace in local storage. Returns a promise with a boolean indicating wether the action was succesful or not. This is secure storage leveraging the native keychain / secure capability

##### nativeEnvironment

This flag lets you know wether you are currently running in a webview inside the app, or if you are relying on the mock provided for development in the browser.
If this value is set to true, you are effectively in the app's native environment. If not, you are running in the browser

#### Typescript

Here is the type declaration of the bridge module returned by the `JS2Native` function. You can see all data and functions available in the bridge. See the example section below for more detailed information on how to use the session storage and hook screen capabilities of the bridge.

```typescript
type ApplicasterJS2NativeBridge = {
  sessionStorage: {
    getItem: (key: string, namespace?: string) => Promise<any>;
    setItem: (key: string, value: any, namespace?: string) => Promise<boolean>;
  };
  localStorage: {
    getItem: (key: string, namespace?: string) => Promise<any>;
    setItem: (key: string, value: any, namespace?: string) => Promise<boolean>;
    getSecuredItem: (key: string, namespace?: string) => Promise<any>;
    setSecuredItem: (key: string, value: any, namespace?: string) => Promise<boolean>;
  };
  screenHook: {
    data: {
      payload: ZappFeedEntry;
      plugin: ZappPlugin;
    };
    callback: (arg: ({ success: boolean, payload: ZappFeedEntry, error?: Error )) => void;
  };
  nativeEnvironment: boolean;
};

// overloading the window object to have valid types when accessing window.Applicaster.JS2Native object
declare global {
  interface Window {
    Applicaster: { JS2Native: ApplicasterJS2NativeBridge };
  }
}

```

### Examples

The example below are written in React, but the bridge can be used with any framework.

#### Hooks

When the webview presenting your web content is configured as a screen hook, the hooks API can give you access to the hook payload, the plugin configuration, and the hook callbacks required to tell the app what is the outcome of the hook.

the `callback` function behaves exactly like the [hooks callback](./plugin-development/30-guides/50-plugins/30-hooks.md) in our React Native API. It allows you to return a success status, modify the hook payload, and optionnaly pass an error.

```typescript
import React, { useEffect } from "react";
import JS2Native from "@applicaster/quick-brick-js-2-native";

const { screenHook } = JS2Native();

export function MyComponent(props) {
  useEffect(() => {
    console.log("hook data", screenHook.data.payload);
    console.log("hook plugin", screenHook.data.plugin);
  }, []);

  const onPress = () => {
    screenHook.callback({
      success: true,
      payload: {
        ...screenHook.data.payload,
        content: { src: `${screenHook.data.payload.content.src}?token=${token}`}
      },
    });
  };

  const onCancel = () => {
    screenHook.callback({
      success: false,
    });
  };

  const onError = () => {
    screenHook.callback({
      success: false,
      error: new Error("oups !"),
    });
  };

  return (
    <div>
      <button onClick={onSuccess}>success</button>
      <button onClick={onCancel}>cancel</button>
      <button onClick={onError}>error</button>
    </dic>
  );
}
```

#### Session Storage

The JS2Native api allows you to interact with the native app's [SessionStorage](./plugin-development/30-guides/70-quick-brick-apis/35-storage.md) capabilities. You can get and set values in session storage.

When running the web content outside of a Quick Brick webview screen, the `@applicaster/quick-brick-js-2-native` library will expose a mock mimicking interaction with the native storage, and relying on the web session storage API.

```typescript
import React, { useEffect } from "react";
import JS2Native from "@applicaster/quick-brick-js-2-native";

const { sessionStorage } = JS2Native();

export function MyComponent(props) {
  const signIn = async () => {
    const appName = await sessionStorage.getItem("app_name");

    try {
      const result = await sessionStorage.setItem(
        "token", // key
        "xxxxx.yyyyy.zzzzz", // value
        "my_namespace" // namespace
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

  return <div>{/* ... */}</div>;
}
```
