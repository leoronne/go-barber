import React from 'react';
import { BeatLoader } from 'react-spinners';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container className="loader-container">
      <BeatLoader
        css={`
          display: block;
          margin: 0 auto;
          border-color: red;
        `}
        size={18}
        color="#c3c3c3"
      />
    </Container>
  );
};
export default Loader;
