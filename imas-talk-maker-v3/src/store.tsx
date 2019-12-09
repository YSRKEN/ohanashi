import { createContext } from 'react';

type ActionType = 'alert';

interface Action {
  type: ActionType;
  message: string;
}

interface ApplicationStore {
  dispatch: (action: Action) => void;
}

export const useApplicationStore = (): ApplicationStore => {
  // dispatch関数
  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'alert':
        alert('sample message.');
        break;
      default:
        break;
    }
  };

  return {
    dispatch
  };
};

export const ApplicationContext = createContext<ApplicationStore>(
  {} as ApplicationStore
);
