import React from 'react';

import { Container, GithubIcon } from './styles';

const Footer: React.FC = () => {
  return (
    <Container data-testid="footer-cointainer">
      <p className="text--center">{`©${new Date().getFullYear()}. All Rights Reserved.`}</p>
      <p>
        <a
          href="https://github.com/leoronne/go-barber"
          target="_blank"
          rel="noopener noreferrer"
          data-tip="GitHub Project"
          data-testid="footer-link"
        >
          <GithubIcon />
        </a>
      </p>
    </Container>
  );
};

export default Footer;
