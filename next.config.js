const { withExpo } = require("@expo/next-adapter");
const withPlugins = require("next-compose-plugins");
const withTM = require("next-transpile-modules")(["react-native-web"]);
const withFonts = require("next-fonts");

const nextConfig = {};

module.exports = withPlugins(
  [withFonts, withTM, [withExpo, { projectRoot: __dirname }]],
  nextConfig
);
