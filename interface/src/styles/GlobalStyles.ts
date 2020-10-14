import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    outline: none !important;
  }

  :root {
    ${props => {
      const { theme } = props;

      let append = '';
      Object.entries(theme).forEach(([prop, value]) => {
        append += `--${prop}: ${value};`;
      });

      return append;
    }}
  }

  body {
    transition: all 0.25s linear;
  }

  html, body, #root {
    scroll-behavior: smooth;
    height: 100vh;
    background-color: var(--body-background);
    font-family: var(--font-family);
    transition: all 0.25s linear;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #3333;
  }

  ::-webkit-scrollbar-thumb {
    background: #89777a;
    border-radius: 4px;
    transition: 0.6s ease !important;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #333333;
    transition: 0.6s ease !important;
  }

  a {
    transition: filter 0.6s ease;
    outline: none;
  }

  a:hover{
    transition: filter 0.6s ease;
    filter: brightness(1.2);
    outline: none;
  }

  .field + .field {
    margin-top: 20px;
  }

  .eye-span {
    margin: 6px 12px 0 0;
    z-index: 2;
    color: var(--color-primary-lighter);
    opacity: 0.8;
    cursor: pointer;
    svg {
      width: 15px;
    }
  }

  .MuiFormControl-root {
    width: 100% !important;
  }

  .g-recaptcha {
    transform: scale(0.9);
    transform-origin: 0 0;
    margin-top: 5px;
  }

  .grecaptcha-badge {
    visibility: hidden !important;
  }

  .back-link {
    background: transparent;
    border: none;
    font-size: 13px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--text-color);
    text-decoration: none;
    transition: var(--transition);
    position: relative;
    height: 20px;

    &:hover {
      filter: var(--hover-effect);
      transition: var(--transition);
    }

    &:before {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-primary-light);
      visibility: hidden;
      transition: all var(--transition);
      opacity: 0.5;
    }

    &:hover:before {
      visibility: visible;
      width: 100%;
    }
  }

  .back-link svg {
    color: var(--color-primary-light);
    margin-right: 8px;
  }

  .back-link svg path {
    color: var(--color-primary-light);
  }

  .CookieConsent{
    border-radius: 5px;
    bottom: 40px !important;
    width: 80% !important;
    left: 10% !important;
  }

  .cookie-subtitle {
    font-size: 10px;
    line-height: 14px;
  }
`;
