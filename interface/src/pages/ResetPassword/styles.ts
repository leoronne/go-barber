import styled, { css, keyframes } from 'styled-components';

import { CgLogIn } from 'react-icons/cg';
import { FaUserPlus } from 'react-icons/fa';
import { RiKeyFill } from 'react-icons/ri';

const iconCSS = css`
  width: 15px;
  height: 15px;
  color: var(--primary);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  height: 100%;
  transition: var(--transition);
  overflow: hidden;

  @media (min-width: 760px) {
    width: 50%;
    margin-left: 50%;
  }
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
    padding: 30px;
    width: 340px;

    text-align: center;
    border-radius: var(--border-radius);
    background: var(--dark-grey);
    box-shadow: var(--box-shadow);
    position: relative;

    h1 {
      color: var(--title-color);
      margin-bottom: 40px;
      font-size: 20px;
    }

    .password-reset-message {
      margin: 10px 20px 30px 20px;
      font-size: 14px;
      color: var(--text-color);
    }

    .submit-button {
      margin-top: 20px;
    }
  }

  .bottom-links {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition);

    &:hover {
      filter: var(--hover-effect);
      transition: var(--transition);
    }
  }
`;

export const LogInIcon = styled(CgLogIn)`
  ${iconCSS}
`;

export const RegisterIcon = styled(FaUserPlus)`
  ${iconCSS}
`;

export const ForgotPassIcon = styled(RiKeyFill)`
  ${iconCSS}
`;
