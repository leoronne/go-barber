import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <Container className="loader-container">
      <CircularProgress size={15} style={{ color: '#7159c1' }} />
    </Container>
  );
};
export default Loader;
