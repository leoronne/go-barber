import React from 'react';

import { Link } from 'react-router-dom';

import DropdownHeader from './DropdownHeader';

import getCurrentURL from '../../utils/getCurrentURL';

import { useAuth, useChangeTheme } from '../../hooks';

import { Container, HeaderContent, Logo, Profile, MoonIcon, SunIcon, HeaderRight, UserIcon } from './styles';

import logo from '~/assets/svg/logo-interna.svg';

const Header: React.FC = () => {
  const { user } = useAuth();
  const { themeName, handleChangeTheme } = useChangeTheme();

  const currentUrl = getCurrentURL();

  return (
    <Container>
      <HeaderContent>
        <Logo>
          <Link to="/">
            <img src={logo} loading="lazy" alt="Go Barber" />
          </Link>

          <Link to="/">
            <span>go barber</span>
          </Link>

          {themeName === 'light' ? <MoonIcon onClick={handleChangeTheme} /> : <SunIcon onClick={handleChangeTheme} />}
        </Logo>

        <HeaderRight>
          <Profile className={currentUrl === '/profile' ? 'active' : ''}>
            <Link to="/profile">
              {user.avatar_url ? <img src={user.avatar_url} alt={user.id} /> : <UserIcon />}

              <span>{user.name && user.name.replace(/ .*/, '')}</span>
            </Link>
          </Profile>

          <DropdownHeader user={user} />
        </HeaderRight>
      </HeaderContent>
    </Container>
  );
};

export default Header;
