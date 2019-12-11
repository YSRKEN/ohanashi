import { createContext, useState } from 'react';
import { loadSetting } from 'service/utility';
import { OhanashiData, ApplicationStore, Action, MessageMode } from 'constant/type';
import { SAMPLE_OHANASHI, SAMPLE_OHANASHI_LIST } from 'constant/other';

export const useApplicationStore = (): ApplicationStore => {
  const [ohanashiDataList, setOhanashiDataList] = useState<OhanashiData[]>(loadSetting('ohanashiDataList', SAMPLE_OHANASHI_LIST));
  const [nowOhanashiData, setNowOhanashiData] = useState<OhanashiData>(SAMPLE_OHANASHI);

  // dispatch関数
  const dispatch = (action: Action) => {
    switch (action.type) {
      case 'changeName':
        setNowOhanashiData({ ...nowOhanashiData, name: action.message });
        break;
      case 'changeMessage':
        setNowOhanashiData({ ...nowOhanashiData, message: action.message });
        break;
      case 'changeMessageMode': {
        setNowOhanashiData({ ...nowOhanashiData, messageMode: action.message as MessageMode });
        break;
      }
      case 'addOhanashi': {
        setOhanashiDataList([...ohanashiDataList, { ...nowOhanashiData }]);
        break;
      }
      default:
        break;
    }
  };

  return {
    nowOhanashiData,
    ohanashiDataList,
    dispatch
  };
};

export const ApplicationContext = createContext<ApplicationStore>({} as ApplicationStore);
