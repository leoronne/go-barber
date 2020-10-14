import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from './styles';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <p>
        {`© ${new Date().getFullYear()}. ${t('designed')}  `}
        <a href="http://github.com/leoronne" target="_blank" rel="noopener noreferrer">
          Leonardo Ronne
        </a>
        .
      </p>
    </Container>
  );
};

export default Footer;
