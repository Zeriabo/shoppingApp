import React from 'react';
<<<<<<< HEAD
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/app/store';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
=======
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
>>>>>>> 9a0e6a41ae837abd2ee8f9123c91947c2ef18251
});
