export const themes = {
  light: {
    'font-family': `'DM Sans', 'Josefin Sans', 'Comfortaa', 'Roboto', sans-serif`,
    transition: '0.7s ease !important',
    'hover-effect': 'brightness(1.1)',
    'border-radius': '6px',

    'input-label': '#a3a3a3',

    'color-white': '#fff',

    'title-color': '#3b2f62',

    'color-primary': '#7159c1',
    'color-primary-light': '#7b69ba',
    'color-primary-lighter': '#7b89ba',
    'color-primary-dark': '#3b2f62',

    'body-background': '#f9f9f9',
    'light-grey': '#c3c3c3',

    'text-color': '#222222',
    'project-button': '#000',

    disabled: '#6a6a6a',

    'menu-hover': '#c3c3c3',
    'menu-background': '#e9e9e9',

    'box-shadow': '0px 3px 2px 0px rgba(0, 0, 0, 0.05)',

    'dark-grey': '#f3f3f3',

    'calendar-background': '#cfced2',
    'day-available': '#6c6c70',
  },
  dark: {
    'font-family': `'DM Sans', 'Josefin Sans', 'Comfortaa', 'Roboto', sans-serif`,
    transition: '0.6s ease !important',
    'hover-effect': 'brightness(1.1)',
    'border-radius': '6px',

    'input-label': '#aea5a5',

    'color-white': '#fff',

    'title-color': '#7b69ba',

    'color-primary': '#7159c1',
    'color-primary-light': '#7b69ba',
    'color-primary-lighter': '#7b89ba',
    'color-primary-dark': '#3b2f62',

    'body-background': '#312e38',
    'light-grey': '#c3c3c3',

    'text-color': '#fff',
    'project-button': '#000',

    disabled: '#9e9e9e',

    'menu-hover': '#787777',
    'menu-background': '#3c3c3c',

    'box-shadow': '0px 3px 2px 0px rgba(0, 0, 0, 0.3)',

    'dark-grey': '#3f3b48',

    'calendar-background': '#28262e',
    'day-available': '#3e3b47',
  },
};

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.light | typeof themes.dark;
