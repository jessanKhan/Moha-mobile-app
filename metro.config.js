const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const baseConfig = getDefaultConfig(__dirname);

const customConfig = {
  // You can add any custom metro config here if needed
};

const mergedConfig = mergeConfig(baseConfig, customConfig);

// Apply NativeWind configuration with your CSS input file
module.exports = withNativeWind(mergedConfig, { input: './src/global.css' });
