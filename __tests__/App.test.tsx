/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('@react-native-documents/picker', () => ({
  pick: jest.fn(),
  keepLocalCopy: jest.fn(),
  isErrorWithCode: jest.fn(() => false),
  errorCodes: {OPERATION_CANCELED: 'OPERATION_CANCELED'},
}));

jest.mock('react-native-fs', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  CachesDirectoryPath: '/tmp',
}));

jest.mock('react-native-sound-player', () => ({
  playUrl: jest.fn(),
  stop: jest.fn(),
}));

import App from '../App';

test('renders app shell correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
