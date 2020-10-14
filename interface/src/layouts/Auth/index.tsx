import React from 'react';
import { Link } from 'react-router-dom';

import { Footer } from '../../components';

import { useChangeTheme, useCookie } from '../../hooks';

import { Container, Logo, MoonIcon, SunIcon, Main } from './styles';

import logo from '~/assets/svg/logo-interna.svg';

interface Props {
  direction?: 'left' | 'right';
  title?: string;
}

const Auth: React.FC<Props> = ({ direction, title, children }) => {
  const { themeName, handleChangeTheme } = useChangeTheme();
  const { ConsentNotification } = useCookie();

  document.title = `${title ? `${title} | ` : ''}Go Barber`;

  return (
    <Container direction={direction}>
      <ConsentNotification />
      <Logo direction={direction}>
        <Link to="/">
          <img src={logo} loading="lazy" alt="Go Barber" />
        </Link>

        <Link to="/">
          <span>go barber</span>
        </Link>

        {themeName === 'light' ? <MoonIcon onClick={handleChangeTheme} /> : <SunIcon onClick={handleChangeTheme} />}
      </Logo>
      <Main>
        {children}
        <Footer />
      </Main>
    </Container>
  );
};

export default Auth;
