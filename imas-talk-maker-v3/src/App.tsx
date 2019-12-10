import React from 'react';
import styled from 'styled-components';
import { GlobalStyles } from 'constant';
import { ApplicationContext, useApplicationStore } from 'service/store';
import OhanashiForm from 'container/ohanashi-form';

const App: React.FC = () => {
  const store = useApplicationStore();

  return (
    <ApplicationContext.Provider value={store}>
      <GlobalStyles />
      <TitleWrapper>
        <Title>テスト</Title>
      </TitleWrapper>
      <OhanashiForm />
    </ApplicationContext.Provider>
  );
};

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.span`
  font-size: 3rem;
`;

export default App;
