import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Fade, ListItemIcon } from '@material-ui/core';

import { useAuth } from '../../../hooks';

import { MenuContainer } from '../../../styles/MaterialUI';

import { Container, Toggler, LogoutIcon, UserIcon, MailIcon } from './styles';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface Props {
  user: User;
}

const DropdownHeader: React.FC<Props> = ({ user }) => {
  const { signOut } = useAuth();
  const { t } = useTranslation();

  const [open, setOpen] = useState(null);

  const handleClick = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => setOpen(null);
  return (
    <Container>
      <Toggler open={Boolean(open)} onClick={handleClick} />
      <MenuContainer id="fade-menu" anchorEl={open} keepMounted open={Boolean(open)} onClose={handleClose} TransitionComponent={Fade}>
        <MenuItem disabled>
          <ListItemIcon>
            <UserIcon />
          </ListItemIcon>
          <span className="titleDropdown">{user.name && user.name}</span>
        </MenuItem>
        <MenuItem disabled>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <span className="titleDropdown">{user ? user.email : ''}</span>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <MdSettings color="#175D8D" />
          </ListItemIcon>
          <Link to="/setting" className="titleDropdown">
            {t('settings')}
          </Link>
        </MenuItem> */}
        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <span className="titleDropdown">{t('logout')}</span>
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default DropdownHeader;
