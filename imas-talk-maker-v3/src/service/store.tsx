import { createContext, useState } from 'react';
import { loadSetting } from 'service/utility';
import { OhanashiData, ApplicationStore, Action } from 'constant/type';
import { SAMPLE_OHANASHI } from 'constant/other';

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
          messageData.iconUrls = ['million/nikaido_chizuru-1.png', 'million/nikaido_chizuru-1.png'];
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
