module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(mp3|svg)$': '<rootDir>/__mocks__/fileMock.js'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-svg)/)'
  ]
};
