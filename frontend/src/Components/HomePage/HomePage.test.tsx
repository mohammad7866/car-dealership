import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('renders welcome message', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to Our Car Dealership')).toBeInTheDocument();
  });

  test('renders car images', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const carImages = screen.getAllByAltText(/BMW/);
    expect(carImages.length).toBe(3); // Assuming there are two car images

    // Example: Test if the first car image is rendered
    expect(carImages[0]).toBeInTheDocument();
  });

  test('renders "Choose Extras" and "Place Order" buttons', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const chooseExtrasButton = screen.getAllByText('Choose Extras');
    const placeOrderButton = screen.getAllByText('Place Order');

    // Example: Test if both buttons are rendered
    expect(chooseExtrasButton.length).toBe(3);
    expect(placeOrderButton.length).toBe(3);
  });
});