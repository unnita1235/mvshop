/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/jest.config.js',
  configurations: {
    'android.emu.debug': {
      device: {
        avdName: 'Pixel_API_29',
      },
      app: 'android/app/build/outputs/apk/debug/app-debug.apk',
    },
  },
};
