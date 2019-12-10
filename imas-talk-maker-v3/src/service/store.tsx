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
      case 'addOhanashi': {
        const messageData: OhanashiData = JSON.parse(action.message);
        if (messageData.messageMode === 'normal') {
          messageData.iconUrls = ['million/nikaido_chizuru-1.png'];
        } else if (messageData.messageMode === 'double') {
          messageData.iconUrls = [
            'million/nikaido_chizuru-1.png',
            'million/nikaido_chizuru-1.png'
          ];
        } else if (messageData.messageMode === 'quartet') {
          messageData.iconUrls = [
            'million/nikaido_chizuru-1.png',
            'million/nikaido_chizuru-1.png',
            'million/nikaido_chizuru-1.png',
            'million/nikaido_chizuru-1.png'
          ];
        } else {
          messageData.iconUrls = [];
        }
        setOhanashiDataList([...ohanashiDataList, messageData]);
        break;
      }
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
