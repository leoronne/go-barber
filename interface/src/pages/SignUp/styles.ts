import styled, { css, keyframes } from 'styled-components';

import { LogIn } from 'styled-icons/boxicons-regular';
import { UserPlus } from 'styled-icons/boxicons-solid';
import { VpnKey } from 'styled-icons/material';

import signupbg from '~assets/img/sign-up-background.png';

const iconCSS = css`
  width: 15px;
  height: 15px;
  color: var(--primary);
`;

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
  transition: var(--transition-slow);
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);

  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${appearFromRight} 1s;

  form {
    margin: 40px 0;
    padding: 20px;
    width: 340px;
    text-align: center;
    border-radius: var(--border-radius);
    background: var(--senary);
    box-shadow: var(--box-shadow);
    position: relative;

    h1 {
      margin-bottom: 30px;
      font-size: 20px;
    }
  }

  .bottom-links {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-slow);

    &:hover {
      filter: var(--hover-effect);
      transition: var(--transition-slow);
    }
  }

  .back-link {
    font-size: 13px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--font-color);
    text-decoration: none;

    &:hover {
      filter: var(--hover-effect);
      transition: var(--transition-slow);
    }
  }

  .back-link svg {
    color: var(--primary-light);
    margin-right: 8px;
  }

  .back-link svg path {
    color: var(--primary-light);
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signupbg}) no-repeat center;
  background-size: cover;
`;

export const LogInIcon = styled(LogIn)`
  ${iconCSS}
`;

export const RegisterIcon = styled(UserPlus)`
  ${iconCSS}
`;

export const ForgotPassIcon = styled(VpnKey)`
  ${iconCSS}
`;
