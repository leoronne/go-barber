import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  :root {
    --font-family-base: 'Roboto Slab', 'Poppins', 'Roboto',  sans-serif;
    --primary: #7159c1;
    --primary-light: #7b69ba;

    --secondary: #d8d8d8;
    --terciary: #efefef;
    --quaternary: #292b2f;
    --quinary: #999999;
    --senary: #3f3b48;

    --background: #312e38;
    --font-color: #efefef;

    --white: #fff;
    --gray: #3b3b3b;
    --light-gray: #a5a6a7;
    --symbol: #74777a;
    --notification: #f84a4b;
    --link: #5d80d6;
    --color-theme: #a0101b;
    --error: #ff6565;
    --ifm-scrollbar-hover: #555;
    --transition-slow: 0.6s ease-in-out !important;
    --filter-transition: filter var(--transition-slow);
    --hover-effect: brightness(1.1);
    --box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.3);
    --nav-size: 60px;
    --footer-size: 60px;
    --cart-row-size: 60px;

    --product-row-height: 80px;
    --border-radius: 8px;
    --padding-low: 10px;

    --input-bg: #232129;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
    outline: 0;
  }

  body {
    background: var(--background);
    color: var(--font-color);
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
    scroll-behavior: smooth;
  }

  *, button, input {
    border: 0;
    outline: 0;
    font-family: var(--font-family-base);
  }

  input {
    padding: 6px 4px 6px 4px;
    border-radius: var(--border-radius);
    transition: 0.9s ease;
    border: 1px solid transparent;
    background: var(--input-bg);
    color: var(--font-color);
  }

  input:disabled {
    background: var(--light-gray);
  }

  input:focus {
    outline: none !important;
    border: 1px solid var(--primary) !important;
    transition: 0.9s ease-in-out;
    box-shadow: 0px 0px 1px var(--primary);
    background: var(--input-bg);
  }


  button {
    border-radius: var(--border-radius);
    transition: var(--transition-slow);
    cursor: pointer;
  }

  button:hover:enabled {
    filter: var(--hover-effect);
    transition: var(--transition-slow);
    box-shadow: var(--box-shadow);
    transform: translateY(-1px);
    transform: translateX(1px);
  }

  button:disabled {
    background: var(--light-gray) !important;
    cursor: not-allowed !important;
  }

  .text--center {
    text-align: center;
  }

  .__react_component_tooltip {
    max-width: 250px !important;
  }

`;
