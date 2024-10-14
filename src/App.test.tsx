import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('should be render', () => {
    render(<App />);

    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /React logo/ })).toHaveAttribute(
      'href',
      'https://react.dev',
    );
    expect(screen.getAllByAltText(/logo/i)).toHaveLength(2);

    expect(screen.getByText('Vite + React')).toBeInTheDocument();


    const button = screen.getByRole('button', { name: /count is 0/i });
    fireEvent.click(button);
    expect(
      screen.queryByRole('button', { name: /count is 0/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /count is 1/i }),
    ).toBeInTheDocument();

    const editMessage = screen.getByText('Edit and save to test HMR');
    expect(editMessage).toBeInTheDocument();
    expect(within(editMessage).getByText(/src\/App.tsx/).tagName).toMatch(
      /code/i,
    );

    expect(
      screen.getByText('Click on the Vite and React logos to learn more'),
    ).toHaveClass('read-the-docs');
  });
});
