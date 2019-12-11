import { createContext, useState } from 'react';
import { loadSetting } from 'service/utility';
import { OhanashiData, ApplicationStore, Action, MessageMode } from 'constant/type';
import { SAMPLE_OHANASHI, SAMPLE_OHANASHI_LIST } from 'constant/other';

export const useApplicationStore = (): ApplicationStore => {
  // 現在入力している「おはなし」の一覧
  const [ohanashiDataList, setOhanashiDataList] = useState<OhanashiData[]>(loadSetting('ohanashiDataList', SAMPLE_OHANASHI_LIST));
  // プレビュー用の「おはなし」
  const [nowOhanashiData, setNowOhanashiData] = useState<OhanashiData>(SAMPLE_OHANASHI);
  // 入力フォームでどのアイコンを選択しているか
  const [selectedIconIndex, setSelectedIconIndex] = useState(-1);

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
        setSelectedIconIndex(-1);
        setNowOhanashiData({ ...nowOhanashiData, messageMode: action.message as MessageMode });
        break;
      }
      case 'addOhanashi': {
        setOhanashiDataList([...ohanashiDataList, { ...nowOhanashiData }]);
        break;
      }
      case 'selectIcon': {
        const index = parseInt(action.message, 10);
        if (selectedIconIndex === index) {
          setSelectedIconIndex(-1);
        } else {
          setSelectedIconIndex(index);
        }
        break;
      }
      default:
        break;
    }
  };

  return {
    nowOhanashiData,
    ohanashiDataList,
    selectedIconIndex,
    dispatch
  };
};

export const ApplicationContext = createContext<ApplicationStore>({} as ApplicationStore);
