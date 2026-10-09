import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './component/jadmin/login';

describe('Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { get: () => 'application/json' },
      json: async () => ({ success: true })
    });
  });

  test('posts to the live auth endpoint instead of a local proxy path', async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'https://jyotiairconditioning.in/websercice/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            username: 'admin',
            password: 'Admin@123'
          })
        })
      );
    });
  });
});
