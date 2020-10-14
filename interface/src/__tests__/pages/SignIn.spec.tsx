import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { SignIn } from '../../pages';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedHandleForgotPassword = jest.fn();
// const mockedNotify = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: key => key }),
}));

jest.mock('../../hooks', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
      handleForgotPassword: mockedHandleForgotPassword,
    }),
    useLanguage: () => ({
      language: 'en',
    }),
  };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
    mockedSignIn.mockClear();
    mockedHandleForgotPassword.mockClear();
    // mockedNotify.mockClear();
  });

  it('should not be able to sign in with invalid values', async () => {
    const { getByTestId } = render(<SignIn />);

    await act(async () => {
      const emailField = await waitFor(() => getByTestId('email-input'));
      const passwordField = await waitFor(() => getByTestId('password-input'));
      const loginButton = await waitFor(() => getByTestId('login-button'));

      fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
      fireEvent.change(passwordField, { target: { value: 'Teste' } });

      await waitFor(() => fireEvent.click(loginButton));

      await waitFor(() => {
        expect(mockedSignIn).not.toHaveBeenCalled();
      });
    });
  });

  it('should be able to sign in', async () => {
    const { getByTestId } = render(<SignIn />);

    await act(async () => {
      const emailField = await waitFor(() => getByTestId('email-input'));
      const passwordField = await waitFor(() => getByTestId('password-input'));
      const loginButton = await waitFor(() => getByTestId('login-button'));

      fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
      fireEvent.change(passwordField, { target: { value: 'Teste123' } });

      await waitFor(() => fireEvent.click(loginButton));

      await waitFor(() => {
        expect(mockedSignIn).toHaveBeenCalledWith('johndoe@example.com', 'Teste123');
      });

      // await waitFor(() => {
      //   expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
      // });
    });
  });

  // it('should display an error if login fails', async () => {
  //   mockedSignIn.mockImplementation(() => {
  //     throw new Error('Test error');
  //   });

  //   const { getByTestId } = render(<SignIn />);

  //   await act(async () => {
  //     const emailField = await waitFor(() => getByTestId('email-input'));
  //     const passwordField = await waitFor(() => getByTestId('password-input'));
  //     const loginButton = await waitFor(() => getByTestId('login-button'));

  //     fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
  //     fireEvent.change(passwordField, { target: { value: 'Teste123' } });

  //     await waitFor(() => fireEvent.click(loginButton));

  //     await waitFor(() => {
  //       expect(mockedNotify).toHaveBeenCalledWith('Test error', 'error');
  //     });
  //   });
  // });

  it('should be able to send forgot password email', async () => {
    const { getByTestId } = render(<SignIn />);

    await act(async () => {
      const emailField = await waitFor(() => getByTestId('email-input-forgotpassword'));
      const sendButton = await waitFor(() => getByTestId('forgotpassword-button'));

      fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

      await waitFor(() => fireEvent.click(sendButton));

      await waitFor(() => {
        expect(mockedHandleForgotPassword).toHaveBeenCalledWith('johndoe@example.com');
      });
    });
  });

  it('should not be able to send forgot password email with invalid email', async () => {
    const { getByTestId } = render(<SignIn />);

    await act(async () => {
      const emailField = await waitFor(() => getByTestId('email-input-forgotpassword'));
      const sendButton = await waitFor(() => getByTestId('forgotpassword-button'));

      fireEvent.change(emailField, { target: { value: 'not-valid-email' } });

      await waitFor(() => fireEvent.click(sendButton));

      await waitFor(() => {
        expect(mockedHandleForgotPassword).not.toHaveBeenCalled();
      });
    });
  });
});
