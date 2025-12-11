const { getDefaultConfig } = require("expo/metro-config");
//@ts-ignore


module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

  const { transformer, resolver } = config;
  

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer/expo")
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  };

  return config;
})();