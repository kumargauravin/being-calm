import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('switches tabs and renders guide content', () => {
    const screen = render(<App />);
    fireEvent.press(screen.getByText('Guide'));
    expect(screen.getByText('In-App Guide')).toBeOnTheScreen();
  });
});
