import React from 'react';
import { ApplicationContext, useApplicationStore } from 'service/store';
import SelectedScene from 'container/selected-scene';
import DerepoView from 'component/derepo-view';
import { SAMPLE_DEREPO_LIST } from 'constant/other';

const App: React.FC = () => {
  const store = useApplicationStore();

  return (
    <ApplicationContext.Provider value={store}>
      <SelectedScene />
    </ApplicationContext.Provider>
  );
};

export default App;
