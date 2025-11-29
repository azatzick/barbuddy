module.exports = function (api) {
    api.cache(true);
    return {
      // 👇 This preset contains the magic that reads .env files
      presets: ['babel-preset-expo'], 
      
      plugins: [
        // Only include this if you are using Reanimated (likely yes)
        'react-native-reanimated/plugin',
      ],
    };
  };