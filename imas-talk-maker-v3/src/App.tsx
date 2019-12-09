import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from 'constant';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Title>テスト</Title>
    </>
  );
};

const Title = styled.span`
  font-size: 3rem;
`;

export default App;
