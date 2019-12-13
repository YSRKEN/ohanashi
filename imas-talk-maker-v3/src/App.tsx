import React from 'react';
import styled from 'styled-components';
import { ApplicationContext, useApplicationStore } from 'service/store';
import SelectedScene from 'container/selected-scene';

const App: React.FC = () => {
  const store = useApplicationStore();

  return (
    <ApplicationContext.Provider value={store}>
      <TitleWrapper>
        <Title>アイマス会話メーカー</Title>
      </TitleWrapper>
      <SelectedScene />
    </ApplicationContext.Provider>
  );
};

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.span`
  font-size: 2rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

export default App;
