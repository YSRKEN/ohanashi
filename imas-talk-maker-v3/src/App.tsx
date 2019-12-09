import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalStyles } from 'constant';
import { ApplicationContext, useApplicationStore } from 'store';
import OhanashiView from 'component/ohanashi-view';

const SampleForm: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  return (
    <>
      <form>
        <button onClick={() => dispatch({ type: 'alert', message: '' })}>
          テスト
        </button>
      </form>
      <OhanashiView dataList={[]} />
    </>
  );
};

const App: React.FC = () => {
  const store = useApplicationStore();

  return (
    <ApplicationContext.Provider value={store}>
      <GlobalStyles />
      <Title>テスト</Title>
      <SampleForm />
    </ApplicationContext.Provider>
  );
};

const Title = styled.span`
  font-size: 3rem;
`;

export default App;
