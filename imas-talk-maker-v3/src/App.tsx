import React from 'react';
import { ApplicationContext, useApplicationStore } from 'service/store';
import SelectedScene from 'container/selected-scene';

const App: React.FC = () => {
  const store = useApplicationStore();

  return (
    <ApplicationContext.Provider value={store}>
      <SelectedScene />
    </ApplicationContext.Provider>
  );
};

export default App;
