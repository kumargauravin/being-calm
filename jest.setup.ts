import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-sound', () => {
  return class MockSound {
    static MAIN_BUNDLE = '';
    constructor(_file: string, _basePath: string, callback: (error?: Error) => void) {
      callback();
    }
    play(callback: (success: boolean) => void) {
      callback(true);
    }
    release() {}
    static setCategory() {}
  };
});

const store: Record<string, string> = {};

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    store[key] = value;
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    delete store[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
    return Promise.resolve();
  })
}));
