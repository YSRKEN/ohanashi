import { createContext, useState } from 'react';
import { OhanashiData, SAMPLE_OHANASHI } from 'constant';
import { loadSetting } from './utility';

type ActionType = 'addOhanashi';

interface Action {
  type: ActionType;
  message: string;
}

interface ApplicationStore {
  ohanashiDataList: OhanashiData[];
  dispatch: (action: Action) => void;
}

export const useApplicationStore = (): ApplicationStore => {
  const [ohanashiDataList, setOhanashiDataList] = useState<OhanashiData[]>(loadSetting('ohanashiDataList', SAMPLE_OHANASHI));

  // dispatch関数
  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'addOhanashi':
        setOhanashiDataList([
          ...ohanashiDataList,
          {
            name: '',
            iconUrls: ['million/nikaido_chizuru-1.png'],
            message: 'サンプルメッセージ',
            messageMode: 'normal'
          }
        ]);
        break;
      default:
        break;
    }
  };

  return {
    ohanashiDataList,
    dispatch
  };
};

export const ApplicationContext = createContext<ApplicationStore>({} as ApplicationStore);
