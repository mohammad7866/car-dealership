import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
import OrderPage from './OrderPage';

// Mock the axios module
jest.mock('axios');

describe('OrderPage component', () => {
  beforeEach(() => {
    // Mock the axios.get implementation
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: [
        { id: 1, extra1Price: 100, extra2Price: 50 },
        { id: 2, extra1Price: 150, extra2Price: 75 },
      ],
    } as AxiosResponse<any>);

    // Mock the axios.delete implementation
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValueOnce({} as AxiosResponse<any>);
  });

  test('renders the header buttons', async () => {
    render(<OrderPage />);
    const homeButton = await screen.findByTestId('home-button');
    const signOutButton = await screen.findByTestId('signout-button');
    expect(homeButton).toBeInTheDocument();
    expect(signOutButton).toBeInTheDocument();
  });

  test('renders the car containers', async () => {
    render(<OrderPage />);
    const carContainers = await screen.findAllByTestId('car-container');
    expect(carContainers).toHaveLength(2);
  });

  test('calculates total price correctly', async () => {
    render(<OrderPage />);
    await waitFor(() => {
      const totalPrices = screen.getAllByText(/^Total Price:/);
      expect(totalPrices).toHaveLength(2);
      expect(totalPrices[0]).toHaveTextContent('£150');
      expect(totalPrices[1]).toHaveTextContent('£225');
    });
  });

  test('handles place order button click', async () => {
    render(<OrderPage />);
    const placeOrderButton = await screen.findByText('Place Order');
    fireEvent.click(placeOrderButton);
    const alert = await screen.findByText(/Your order for car/);
    expect(alert).toBeInTheDocument();
  });

  test('handles delete car button click', async () => {
    render(<OrderPage />);
    const deleteCarButton = await screen.findByText('Delete Car');
    fireEvent.click(deleteCarButton);
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
    });
  });
});
